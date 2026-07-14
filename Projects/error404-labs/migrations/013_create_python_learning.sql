-- Migration 013: Python Learning Platform
-- Tables cho khóa học Python tương tác (CodeMirror 6 + Pyodide)

-- 1. Profiles mở rộng cho Python learning
CREATE TABLE IF NOT EXISTS error404labs.py_profiles (
    id INTEGER PRIMARY KEY REFERENCES error404labs.members(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url TEXT,
    total_xp INTEGER DEFAULT 0 NOT NULL,
    current_streak INTEGER DEFAULT 0 NOT NULL,
    longest_streak INTEGER DEFAULT 0 NOT NULL,
    last_learning_date DATE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Courses
CREATE TABLE IF NOT EXISTS error404labs.py_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT DEFAULT '',
    thumbnail_url TEXT DEFAULT '',
    difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    published BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Chapters
CREATE TABLE IF NOT EXISTS error404labs.py_chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES error404labs.py_courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Lessons
CREATE TABLE IF NOT EXISTS error404labs.py_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID NOT NULL REFERENCES error404labs.py_chapters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT DEFAULT '',
    lesson_type TEXT DEFAULT 'practice' NOT NULL CHECK (lesson_type IN ('theory', 'practice', 'quiz', 'project')),
    content_markdown TEXT DEFAULT '',
    starter_code TEXT DEFAULT '',
    difficulty TEXT DEFAULT 'easy' NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    xp_reward INTEGER DEFAULT 10 NOT NULL,
    estimated_minutes INTEGER DEFAULT 10,
    comparison_mode TEXT DEFAULT 'exact' NOT NULL CHECK (comparison_mode IN ('exact', 'float', 'custom', 'contains')),
    float_epsilon NUMERIC DEFAULT 0.001,
    time_limit_ms INTEGER DEFAULT 10000,
    order_index INTEGER NOT NULL,
    published BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(chapter_id, slug)
);

-- 5. Test cases
CREATE TABLE IF NOT EXISTS error404labs.py_test_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES error404labs.py_lessons(id) ON DELETE CASCADE,
    stdin TEXT DEFAULT '',
    expected_output TEXT NOT NULL,
    is_hidden BOOLEAN DEFAULT false NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 6. Submissions
CREATE TABLE IF NOT EXISTS error404labs.py_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER NOT NULL REFERENCES error404labs.members(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES error404labs.py_lessons(id) ON DELETE CASCADE,
    source_code TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'passed', 'failed', 'error')),
    passed_tests INTEGER DEFAULT 0 NOT NULL,
    total_tests INTEGER DEFAULT 0 NOT NULL,
    execution_time_ms INTEGER DEFAULT 0,
    results JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 7. Lesson progress
CREATE TABLE IF NOT EXISTS error404labs.py_lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER NOT NULL REFERENCES error404labs.members(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES error404labs.py_lessons(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'locked' CHECK (status IN ('locked', 'in_progress', 'completed')),
    first_started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    best_submission_id UUID REFERENCES error404labs.py_submissions(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_id, lesson_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_py_chapters_course ON error404labs.py_chapters(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_py_lessons_chapter ON error404labs.py_lessons(chapter_id, order_index);
CREATE INDEX IF NOT EXISTS idx_py_lessons_slug ON error404labs.py_lessons(chapter_id, slug);
CREATE INDEX IF NOT EXISTS idx_py_tests_lesson ON error404labs.py_test_cases(lesson_id, order_index);
CREATE INDEX IF NOT EXISTS idx_py_submissions_user ON error404labs.py_submissions(user_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_py_submissions_created ON error404labs.py_submissions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_py_progress_user ON error404labs.py_lesson_progress(user_id, lesson_id);

-- Trigger: auto-update updated_at
CREATE OR REPLACE FUNCTION error404labs.py_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'py_courses_updated_at') THEN
        CREATE TRIGGER py_courses_updated_at BEFORE UPDATE ON error404labs.py_courses
        FOR EACH ROW EXECUTE FUNCTION error404labs.py_update_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'py_chapters_updated_at') THEN
        CREATE TRIGGER py_chapters_updated_at BEFORE UPDATE ON error404labs.py_chapters
        FOR EACH ROW EXECUTE FUNCTION error404labs.py_update_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'py_lessons_updated_at') THEN
        CREATE TRIGGER py_lessons_updated_at BEFORE UPDATE ON error404labs.py_lessons
        FOR EACH ROW EXECUTE FUNCTION error404labs.py_update_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'py_profiles_updated_at') THEN
        CREATE TRIGGER py_profiles_updated_at BEFORE UPDATE ON error404labs.py_profiles
        FOR EACH ROW EXECUTE FUNCTION error404labs.py_update_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'py_progress_updated_at') THEN
        CREATE TRIGGER py_progress_updated_at BEFORE UPDATE ON error404labs.py_lesson_progress
        FOR EACH ROW EXECUTE FUNCTION error404labs.py_update_updated_at();
    END IF;
END;
$$;
