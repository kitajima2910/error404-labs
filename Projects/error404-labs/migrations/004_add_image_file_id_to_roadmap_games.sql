-- Migration: Add image_file_id column to roadmap_games table
-- This column stores the ImageKit file ID for roadmap game images

ALTER TABLE error404labs.roadmap_games
    ADD COLUMN IF NOT EXISTS image_file_id TEXT;

-- Note: image_file_id allows NULL because not all games have images
-- Existing rows will have NULL by default, which is acceptable
