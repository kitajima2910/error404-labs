ALTER TABLE error404labs.roadmap_games ALTER COLUMN month SET DEFAULT 0;
ALTER TABLE error404labs.roadmap_games ALTER COLUMN week SET DEFAULT 0;
UPDATE error404labs.roadmap_games SET month = 0 WHERE month IS NULL;
UPDATE error404labs.roadmap_games SET week = 0 WHERE week IS NULL;
