DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'error404labs'
            AND table_name = 'roadmap_games'
            AND column_name = 'month_no'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'error404labs'
            AND table_name = 'roadmap_games'
            AND column_name = 'month'
    ) THEN
        ALTER TABLE error404labs.roadmap_games RENAME COLUMN month_no TO month;
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'error404labs'
            AND table_name = 'roadmap_games'
            AND column_name = 'week_no'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'error404labs'
            AND table_name = 'roadmap_games'
            AND column_name = 'week'
    ) THEN
        ALTER TABLE error404labs.roadmap_games RENAME COLUMN week_no TO week;
    END IF;
END $$;

ALTER TABLE error404labs.roadmap_games
    ADD COLUMN IF NOT EXISTS image_url TEXT;

ALTER TABLE error404labs.roadmap_games
    ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

UPDATE error404labs.roadmap_games
SET sort_order = 0
WHERE sort_order IS NULL;

ALTER TABLE error404labs.roadmap_games
    ALTER COLUMN sort_order SET DEFAULT 0;
