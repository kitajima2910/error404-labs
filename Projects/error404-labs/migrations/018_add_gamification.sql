-- Migration 018: Gamification — achievements, level gating, user badges
-- Chạy trên Neon console

-- 1. Thêm min_level cho chapters (bonus chapter gating)
ALTER TABLE error404labs.py_chapters
    ADD COLUMN IF NOT EXISTS min_level INTEGER DEFAULT 0 NOT NULL;

-- 2. Bảng định nghĩa thành tích (static seed data)
CREATE TABLE IF NOT EXISTS error404labs.py_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    icon TEXT NOT NULL DEFAULT '🏆',
    criteria_type TEXT NOT NULL CHECK (criteria_type IN (
        'xp_total', 'streak', 'lessons_completed', 'course_complete', 'weekly_lessons'
    )),
    criteria_value INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Bảng thành tích người dùng đã đạt được
CREATE TABLE IF NOT EXISTS error404labs.py_user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER NOT NULL REFERENCES error404labs.members(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES error404labs.py_achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_id, achievement_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_py_user_achievements_user
    ON error404labs.py_user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_py_user_achievements_earned
    ON error404labs.py_user_achievements(earned_at DESC);

-- 4. Seed achievements
INSERT INTO error404labs.py_achievements (code, title, description, icon, criteria_type, criteria_value) VALUES
    ('first_lesson',   'Bước đầu tiên',     'Hoàn thành bài học đầu tiên',                    '🌱', 'lessons_completed', 1),
    ('lessons_10',     'Học viên chăm chỉ',  'Hoàn thành 10 bài học',                          '📚', 'lessons_completed', 10),
    ('lessons_20',     'Mọt sách',           'Hoàn thành 20 bài học',                          '📖', 'lessons_completed', 20),
    ('xp_100',         '100 XP',             'Đạt 100 điểm XP',                                '⭐', 'xp_total', 100),
    ('xp_500',         'Thợ săn XP',         'Đạt 500 điểm XP',                                '🌟', 'xp_total', 500),
    ('xp_1000',        'Cao thủ XP',         'Đạt 1000 điểm XP',                               '💫', 'xp_total', 1000),
    ('streak_7',       '7 ngày liên tiếp',   'Học 7 ngày liên tiếp',                           '🔥', 'streak', 7),
    ('streak_30',      '30 ngày liên tiếp',  'Học 30 ngày liên tiếp',                          '💪', 'streak', 30),
    ('course_complete','Tốt nghiệp',         'Hoàn thành tất cả bài học trong khóa học',       '🎓', 'course_complete', 1)
ON CONFLICT (code) DO NOTHING;
