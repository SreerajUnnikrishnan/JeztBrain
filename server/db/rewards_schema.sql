-- SQL Schema Additions for JeztBrain Rewards & Revenue System
-- Run this in your Supabase SQL Editor

-- 1. Expert Rewards Table
CREATE TABLE IF NOT EXISTS public.expert_rewards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    expert_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    incident_id UUID REFERENCES public.incidents(id) ON DELETE SET NULL,
    reward_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    reward_type VARCHAR(50) NOT NULL, -- 'low', 'medium', 'high', 'critical'
    status VARCHAR(50) NOT NULL DEFAULT 'credited', -- 'pending', 'credited', 'withdrawn'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for expert_rewards
ALTER TABLE public.expert_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experts can view their own rewards"
ON public.expert_rewards FOR SELECT
USING (auth.uid() = expert_id);

-- 2. Expert Payouts Table
CREATE TABLE IF NOT EXISTS public.expert_payouts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    expert_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'upi', 'bank_transfer', 'paypal', 'razorpay'
    payout_status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for expert_payouts
ALTER TABLE public.expert_payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experts can view their own payouts"
ON public.expert_payouts FOR SELECT
USING (auth.uid() = expert_id);

CREATE POLICY "Experts can insert their own payout requests"
ON public.expert_payouts FOR INSERT
WITH CHECK (auth.uid() = expert_id);

-- 3. Expert Badges Table
CREATE TABLE IF NOT EXISTS public.expert_badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    expert_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_name VARCHAR(100) NOT NULL, -- 'elite_responder', 'threat_hunter', 'rapid_response', 'top_expert'
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for expert_badges
ALTER TABLE public.expert_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experts can view their own badges"
ON public.expert_badges FOR SELECT
USING (auth.uid() = expert_id);
