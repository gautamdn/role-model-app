-- Add focus_traits column to child_profiles table
-- Run this in Supabase SQL Editor

ALTER TABLE child_profiles
ADD COLUMN IF NOT EXISTS focus_traits TEXT[] DEFAULT '{}';

-- Add a comment for documentation
COMMENT ON COLUMN child_profiles.focus_traits IS 'Array of character trait IDs the child is focusing on (max 5)';
