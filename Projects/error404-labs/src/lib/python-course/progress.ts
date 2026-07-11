// Logic mở khoá lesson, điều hướng giữa các lessons

// ─── Interfaces ───────────────────────────────────────────────────────────

export interface PyLesson {
    id: string
    chapter_id: string
    title: string
    slug: string
    order_index: number
    published: boolean
    // Các field khác không cần cho logic progress
    [key: string]: any
}

export interface PyLessonProgress {
    id: string
    user_id: number
    lesson_id: string
    status: 'locked' | 'in_progress' | 'completed'
    // Các field khác
    [key: string]: any
}

// ─── Helpers ──────────────────────────────────────────────────────────────

/**
 * Sắp xếp lessons theo chapter (giữ thứ tự chapter từ input array)
 * rồi theo order_index trong mỗi chapter.
 *
 * Input array nên được truyền với chapters đã sắp xếp đúng thứ tự
 * (vd: từ getCourseBySlug → chapters đã ORDER BY order_index).
 */
function sortLessons(courseLessons: PyLesson[]): PyLesson[] {
    const published = courseLessons.filter((l) => l.published)
    if (published.length === 0) return []

    // Duy trì thứ tự chapter từ input array
    const chapterOrder = new Map<string, number>()
    let chIndex = 0
    for (const lesson of published) {
        if (!chapterOrder.has(lesson.chapter_id)) {
            chapterOrder.set(lesson.chapter_id, chIndex++)
        }
    }

    return [...published].sort((a, b) => {
        const chA = chapterOrder.get(a.chapter_id) ?? 0
        const chB = chapterOrder.get(b.chapter_id) ?? 0
        if (chA !== chB) return chA - chB
        return a.order_index - b.order_index
    })
}

/**
 * Lấy danh sách lesson IDs đã hoàn thành
 */
function getCompletedIds(progress: PyLessonProgress[]): Set<string> {
    return new Set(
        progress
            .filter((p) => p.status === 'completed')
            .map((p) => p.lesson_id)
    )
}

// ─── isLessonUnlocked ────────────────────────────────────────────────────

/**
 * Kiểm tra một lesson có được mở khoá hay không.
 *
 * Quy tắc:
 *   - Lesson đầu tiên của course luôn unlocked
 *   - Lesson khác unlocked nếu lesson trước đó (trong cùng chapter
 *     hoặc chapter trước) đã completed
 *
 * @param courseLessons Mảng tất cả lessons trong course (từ các chapters)
 *                      Nên truyền theo thứ tự chapter đã sắp xếp.
 * @param progress      Mảng progress records của user
 * @param lessonId      ID của lesson cần kiểm tra
 */
export function isLessonUnlocked(
    courseLessons: PyLesson[],
    progress: PyLessonProgress[],
    lessonId: string
): boolean {
    const sorted = sortLessons(courseLessons)
    if (sorted.length === 0) return false

    const completedIds = getCompletedIds(progress)

    // Lesson đầu tiên luôn unlocked
    if (sorted[0].id === lessonId) return true

    // Tìm lesson hiện tại
    const currentIndex = sorted.findIndex((l) => l.id === lessonId)
    if (currentIndex === -1) return false

    // Lesson trước đó (trong mảng đã sort) phải completed
    if (currentIndex > 0) {
        return completedIds.has(sorted[currentIndex - 1].id)
    }

    return true
}

// ─── getNextLesson ────────────────────────────────────────────────────────

/**
 * Lấy lesson kế tiếp trong course
 *
 * @param courseLessons   Mảng tất cả lessons trong course
 * @param currentLessonId ID của lesson hiện tại
 * @returns Lesson kế tiếp, hoặc null nếu đã là lesson cuối
 */
export function getNextLesson(
    courseLessons: PyLesson[],
    currentLessonId: string
): PyLesson | null {
    const sorted = sortLessons(courseLessons)
    const currentIndex = sorted.findIndex((l) => l.id === currentLessonId)

    if (currentIndex === -1 || currentIndex >= sorted.length - 1) {
        return null
    }

    return sorted[currentIndex + 1]
}

// ─── getPrevLesson ────────────────────────────────────────────────────────

/**
 * Lấy lesson trước đó trong course
 *
 * @param courseLessons   Mảng tất cả lessons trong course
 * @param currentLessonId ID của lesson hiện tại
 * @returns Lesson trước đó, hoặc null nếu đã là lesson đầu
 */
export function getPrevLesson(
    courseLessons: PyLesson[],
    currentLessonId: string
): PyLesson | null {
    const sorted = sortLessons(courseLessons)
    const currentIndex = sorted.findIndex((l) => l.id === currentLessonId)

    if (currentIndex <= 0) {
        return null
    }

    return sorted[currentIndex - 1]
}
