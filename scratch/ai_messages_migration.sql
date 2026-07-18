-- ─── JeztBrain SOC AI — Database Setup ───────────────────────────────────────
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Create ai_messages table
CREATE TABLE IF NOT EXISTS public.ai_messages (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    message     TEXT        NOT NULL,
    sender_type TEXT        NOT NULL CHECK (sender_type IN ('user', 'ai')),
    created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Create index for fast per-user queries
CREATE INDEX IF NOT EXISTS idx_ai_messages_user_id ON public.ai_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_messages_created_at ON public.ai_messages(created_at);

-- 3. Enable Row Level Security
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies — users can only see and insert their own messages
CREATE POLICY "Users can read own AI messages"
    ON public.ai_messages FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI messages"
    ON public.ai_messages FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 5. Enable Realtime for live message sync
ALTER PUBLICATION supabase_realtime ADD TABLE ai_messages;

-- Verify the table was created:
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'ai_messages' ORDER BY ordinal_position;
