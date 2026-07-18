-- SQL Schema Additions for JeztBrain Real-time Incident System

-- Ensure incidents table has timeline support and expert_id (if not already present)
ALTER TABLE IF EXISTS public.incidents
ADD COLUMN IF NOT EXISTS timeline JSONB DEFAULT '[]'::jsonb;

-- 1. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL, -- user or expert ID who receives the notification
    type VARCHAR(50) NOT NULL, -- e.g., 'new_incident', 'incident_assigned', 'status_update'
    message TEXT NOT NULL,
    related_incident_id UUID REFERENCES public.incidents(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id);

-- 2. Incident Activity Logs Table (For tracking timeline events specifically)
CREATE TABLE IF NOT EXISTS public.incident_activity_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    incident_id UUID NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL, -- e.g., 'created', 'assigned', 'status_changed', 'note_added'
    description TEXT,
    actor_id UUID, -- Who did it
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for Activity Logs
ALTER TABLE public.incident_activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants can view incident logs"
ON public.incident_activity_logs FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.incidents
        WHERE incidents.id = incident_activity_logs.incident_id
        AND (incidents.user_id = auth.uid() OR incidents.expert_id = auth.uid())
    )
);

-- 3. Messages table updates (just ensuring the table schema handles files)
ALTER TABLE IF EXISTS public.messages
ADD COLUMN IF NOT EXISTS attachment_url TEXT;

-- NOTE: Execute these commands in the Supabase SQL Editor.
