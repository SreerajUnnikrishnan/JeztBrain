-- ─── JeztBrain Production Database Setup ───────────────────────────────────
-- Run this in your Supabase SQL Editor to ensure all tables and policies are correct.

-- 1. INCIDENTS TABLE
CREATE TABLE IF NOT EXISTS public.incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    expert_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    incidenttype TEXT NOT NULL,
    severitylevel TEXT NOT NULL DEFAULT 'medium',
    description TEXT,
    affectedsystems TEXT,
    status TEXT NOT NULL DEFAULT 'open',
    ticket_number TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. MESSAGES TABLE (REBUILT)
-- DROP TABLE IF EXISTS public.messages; -- Uncomment if you want to wipe old messages
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id UUID REFERENCES public.incidents(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    sender_role TEXT, -- 'user', 'expert', 'admin'
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    is_read BOOLEAN DEFAULT false
);

-- 3. ENABLE REALTIME
-- Note: You may also need to enable this in the Supabase Dashboard: 
-- Database -> Replication -> Tables -> Check 'incidents' and 'messages'
ALTER PUBLICATION supabase_realtime ADD TABLE incidents;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- 4. RLS POLICIES - INCIDENTS
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

-- Users can see their own incidents
CREATE POLICY "Users can view own incidents" ON public.incidents
    FOR SELECT USING (auth.uid() = user_id);

-- Experts can see open incidents or assigned incidents
CREATE POLICY "Experts can view triage queue and assigned cases" ON public.incidents
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('expert', 'security_specialist', 'network_specialist', 'admin')
        )
    );

-- Users can report incidents
CREATE POLICY "Users can report incidents" ON public.incidents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Experts can update incidents (accepting/closing)
CREATE POLICY "Experts can update cases" ON public.incidents
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('expert', 'security_specialist', 'network_specialist', 'admin')
        )
    );

-- 5. RLS POLICIES - MESSAGES
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Users and Experts can see messages for incidents they are part of
CREATE POLICY "Participants can view incident messages" ON public.messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.incidents
            WHERE incidents.id = messages.incident_id
            AND (incidents.user_id = auth.uid() OR incidents.expert_id = auth.uid())
        )
    );

-- Participants can send messages
CREATE POLICY "Participants can send messages" ON public.messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.incidents
            WHERE incidents.id = messages.incident_id
            AND (incidents.user_id = auth.uid() OR incidents.expert_id = auth.uid())
        )
    );

-- 6. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_incidents_user_id ON public.incidents(user_id);
CREATE INDEX IF NOT EXISTS idx_incidents_expert_id ON public.incidents(expert_id);
CREATE INDEX IF NOT EXISTS idx_messages_incident_id ON public.messages(incident_id);
