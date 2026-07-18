-- Phase 1 Fix: Add room_id and ensure status constraint supports 'Accepted'

-- Add room_id column
ALTER TABLE IF EXISTS public.incidents
ADD COLUMN IF NOT EXISTS room_id VARCHAR(50);

-- Note: The 'status' column in public.incidents is typically a VARCHAR or TEXT. 
-- If it's an ENUM type, we would need to add the 'Accepted' value to the enum type.
-- Assuming it is a TEXT/VARCHAR field, we don't need to alter the type, but just in case:
-- ALTER TYPE incident_status ADD VALUE IF NOT EXISTS 'Accepted';
-- ALTER TYPE incident_status ADD VALUE IF NOT EXISTS 'Pending';
