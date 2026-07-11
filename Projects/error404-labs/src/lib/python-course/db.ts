import { neon } from '@neondatabase/serverless'

// ─── Interfaces ───────────────────────────────────────────────────────────
// Dựa trên schema migration 013

export interface PyCourse {
    id: string
    title: string
    slug: string
    description: string
    thumbnail_url: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    published: boolean
    created_at: string
    updated_at: string
}

export interface PyChapter {
    id: string
    course_id: string
    title: string
    description: string
    order_index: number
    created_at: string
    updated_at: string
}

export interface PyLesson {
    id: string
    chapter_id: string
    title: string
    slug: string
    description: string
    lesson_type: 'theory' | 'practice' | 'quiz' | 'project'
    content_markdown: string
    starter_code: string
    difficulty: 'easy' | 'medium' | 'hard'
    xp_reward: number
    estimated_minutes: number
    comparison_mode: 'exact' | 'float' | 'custom'
    float_epsilon: number
    time_limit_ms: number
    order_index: number
    published: boolean
    created_at: string
    updated_at: string
}

export interface PyTestCase {
    id: string
    lesson_id: string
    stdin: string
    expected_output: string
    is_hidden: boolean
    order_index: number
    created_at: string
}

export interface PySubmission {
    id: string
    user_id: number
    lesson_id: string
    source_code: string
    status: 'pending' | 'passed' | 'failed' | 'error'
    passed_tests: number
    total_tests: number
    execution_time_ms: number
    results: TestResult[]
    created_at: string
}

export interface PyLessonProgress {
    id: string
    user_id: number
    lesson_id: string
    status: 'locked' | 'in_progress' | 'completed'
    first_started_at: string | null
    completed_at: string | null
    best_submission_id: string | null
    created_at: string
    updated_at: string
}

export interface PyProfile {
    id: number
    display_name: string | null
    avatar_url: string | null
    total_xp: number
    current_streak: number
    longest_streak: number
    last_learning_date: string | null
    created_at: string
    updated_at: string
}

export interface TestResult {
    stdin: string
    expected: string
    actual: string
    passed: boolean
    is_hidden: boolean
}

export interface CourseWithContent extends PyCourse {
    chapters: (PyChapter & { lessons: PyLesson[] })[]
}

export interface LessonWithTests extends PyLesson {
    test_cases: PyTestCase[]
}

// ─── Database connection ──────────────────────────────────────────────────
// Dùng pattern giống API routes hiện tại
const sql = neon(import.meta.env.DATABASE_URL)

// ─── Course queries ───────────────────────────────────────────────────────

/**
 * Lấy course theo slug kèm chapters + lessons (published only)
 */
export async function getCourseBySlug(slug: string): Promise<CourseWithContent | null> {
    const courses = await sql`
        SELECT * FROM error404labs.py_courses
        WHERE slug = ${slug}
        LIMIT 1
    `
    if (courses.length === 0) return null

    const course = courses[0] as PyCourse

    const chapters = await sql`
        SELECT * FROM error404labs.py_chapters
        WHERE course_id = ${course.id}
        ORDER BY order_index ASC
    `

    const chaptersWithLessons = await Promise.all(
        (chapters as PyChapter[]).map(async (ch) => {
            const lessons = await sql`
                SELECT * FROM error404labs.py_lessons
                WHERE chapter_id = ${ch.id} AND published = true
                ORDER BY order_index ASC
            `
            return { ...ch, lessons: lessons as PyLesson[] }
        })
    )

    return { ...course, chapters: chaptersWithLessons }
}

/**
 * Lấy danh sách course đã published
 */
export async function getCourseList(): Promise<PyCourse[]> {
    const courses = await sql`
        SELECT * FROM error404labs.py_courses
        WHERE published = true
        ORDER BY created_at ASC
    `
    return courses as PyCourse[]
}

// ─── Lesson queries ───────────────────────────────────────────────────────

/**
 * Lấy lesson theo course slug + lesson slug (chỉ public test cases)
 *
 * Lưu ý: chapters không có slug trong schema hiện tại,
 * nên tham số chapterSlug được dùng như course slug để định vị lesson.
 */
export async function getLessonBySlug(
    chapterSlug: string,
    lessonSlug: string
): Promise<LessonWithTests | null> {
    // Tìm course theo slug (chapterSlug thực chất là course slug)
    const courses = await sql`
        SELECT id FROM error404labs.py_courses
        WHERE slug = ${chapterSlug}
        LIMIT 1
    `
    if (courses.length === 0) return null
    const courseId = courses[0].id

    // Tìm lesson trong bất kỳ chapter nào của course này
    const lessons = await sql`
        SELECT l.* FROM error404labs.py_lessons l
        JOIN error404labs.py_chapters ch ON ch.id = l.chapter_id
        WHERE ch.course_id = ${courseId}
          AND l.slug = ${lessonSlug}
          AND l.published = true
        LIMIT 1
    `
    if (lessons.length === 0) return null
    const lesson = lessons[0] as PyLesson

    // Chỉ lấy test cases public (không hidden)
    const testCases = await sql`
        SELECT id, stdin, expected_output, is_hidden, order_index
        FROM error404labs.py_test_cases
        WHERE lesson_id = ${lesson.id} AND is_hidden = false
        ORDER BY order_index ASC
    `

    return { ...lesson, test_cases: testCases as PyTestCase[] }
}

/**
 * Lấy lesson với tất cả test cases (kể cả hidden) — dùng cho server-side grading
 */
export async function getLessonWithTests(lessonId: string): Promise<LessonWithTests | null> {
    const lessons = await sql`
        SELECT * FROM error404labs.py_lessons
        WHERE id = ${lessonId}
        LIMIT 1
    `
    if (lessons.length === 0) return null
    const lesson = lessons[0] as PyLesson

    const testCases = await sql`
        SELECT * FROM error404labs.py_test_cases
        WHERE lesson_id = ${lesson.id}
        ORDER BY order_index ASC
    `

    return { ...lesson, test_cases: testCases as PyTestCase[] }
}

// ─── Progress & Submission ────────────────────────────────────────────────

/**
 * Lấy progress của user cho một lesson
 */
export async function getUserProgress(
    userId: number,
    lessonId: string
): Promise<PyLessonProgress | null> {
    const results = await sql`
        SELECT * FROM error404labs.py_lesson_progress
        WHERE user_id = ${userId} AND lesson_id = ${lessonId}
        LIMIT 1
    `
    return results.length > 0 ? (results[0] as PyLessonProgress) : null
}

/**
 * Lưu submission mới
 */
export async function saveSubmission(
    userId: number,
    lessonId: string,
    sourceCode: string,
    status: 'pending' | 'passed' | 'failed' | 'error',
    passed: number,
    total: number,
    results: TestResult[]
): Promise<PySubmission> {
    const inserted = await sql`
        INSERT INTO error404labs.py_submissions
            (user_id, lesson_id, source_code, status, passed_tests, total_tests, results)
        VALUES (${userId}, ${lessonId}, ${sourceCode}, ${status}, ${passed}, ${total}, ${JSON.stringify(results)})
        RETURNING *
    `
    return inserted[0] as PySubmission
}

/**
 * Upsert progress — tạo mới nếu chưa có, cập nhật nếu đã có
 */
export async function updateProgress(
    userId: number,
    lessonId: string,
    status: 'locked' | 'in_progress' | 'completed',
    submissionId?: string
): Promise<PyLessonProgress> {
    const existing = await getUserProgress(userId, lessonId)

    if (existing) {
        const updated = await sql`
            UPDATE error404labs.py_lesson_progress
            SET status = ${status},
                best_submission_id = COALESCE(${submissionId || null}, best_submission_id),
                completed_at = CASE
                    WHEN ${status} = 'completed' AND completed_at IS NULL THEN now()
                    ELSE completed_at
                END,
                first_started_at = CASE
                    WHEN first_started_at IS NULL THEN now()
                    ELSE first_started_at
                END,
                updated_at = now()
            WHERE id = ${existing.id}
            RETURNING *
        `
        return updated[0] as PyLessonProgress
    }

    // Tạo mới nếu chưa có progress record
    const inserted = await sql`
        INSERT INTO error404labs.py_lesson_progress
            (user_id, lesson_id, status, first_started_at, best_submission_id)
        VALUES (
            ${userId},
            ${lessonId},
            ${status},
            CASE WHEN ${status} != 'locked' THEN now() ELSE NULL END,
            ${submissionId || null}
        )
        RETURNING *
    `
    return inserted[0] as PyLessonProgress
}

/**
 * Cộng XP cho user — caller chịu trách nhiệm chỉ gọi 1 lần/lesson
 * (Không cần lessonId vì check trùng được xử lý bởi logic business phía trên)
 */
export async function awardXp(userId: number, xp: number): Promise<void> {
    await sql`
        UPDATE error404labs.py_profiles
        SET total_xp = total_xp + ${xp},
            updated_at = now()
        WHERE id = ${userId}
    `
}

/**
 * Cập nhật streak sau khi hoàn thành lesson
 * Logic: hôm qua → tăng, hôm nay → giữ, khác → reset
 */
export async function updateStreak(userId: number): Promise<void> {
    const profile = await getOrCreateProfile(userId)

    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    let newStreak = profile.current_streak
    const lastDate = profile.last_learning_date

    if (lastDate === todayStr) {
        // Đã học hôm nay — giữ nguyên streak
    } else if (lastDate === yesterdayStr) {
        // Học tiếp nối hôm qua — tăng streak
        newStreak += 1
    } else {
        // Ngắt quãng — reset streak
        newStreak = 1
    }

    const newLongest = Math.max(newStreak, profile.longest_streak)

    await sql`
        UPDATE error404labs.py_profiles
        SET current_streak = ${newStreak},
            longest_streak = ${newLongest},
            last_learning_date = ${todayStr},
            updated_at = now()
        WHERE id = ${userId}
    `
}

// ─── Profile ──────────────────────────────────────────────────────────────

/**
 * Lấy hoặc tạo profile mới cho member
 */
export async function getOrCreateProfile(memberId: number): Promise<PyProfile> {
    const profiles = await sql`
        SELECT * FROM error404labs.py_profiles
        WHERE id = ${memberId}
        LIMIT 1
    `

    if (profiles.length > 0) {
        return profiles[0] as PyProfile
    }

    // Chưa có profile — tạo mới với giá trị mặc định
    const inserted = await sql`
        INSERT INTO error404labs.py_profiles (id)
        VALUES (${memberId})
        RETURNING *
    `
    return inserted[0] as PyProfile
}
