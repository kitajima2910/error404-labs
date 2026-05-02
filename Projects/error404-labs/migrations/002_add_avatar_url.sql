-- Add avatar_url column to members table
ALTER TABLE error404labs.members ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Create index for faster queries (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_members_avatar_url ON error404labs.members(avatar_url);
