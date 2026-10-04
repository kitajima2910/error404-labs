export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

export const formatDate = (date, locale) => {
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export const formatBlogPost = (
    posts,
    { filterOutDrafts = true, sortByDate = true, limit },
) => {
    // console.log(posts)
    let postsClone = JSON.parse(JSON.stringify(posts))

    // postsClone = postsClone.slice(0, limit)

    if (sortByDate) {
        postsClone = postsClone.sort((a, b) => {
            return (
                new Date(b.frontmatter.date).getTime() -
                new Date(a.frontmatter.date).getTime()
            )
        })
    } else {
        postsClone = postsClone.sort(() => Math.random() - 0.5)
    }

    if (filterOutDrafts) {
        postsClone = postsClone.filter((post) => !post.frontmatter.draft)
    }

    return postsClone.slice(
        0,
        limit < postsClone.length ? limit : postsClone.length,
    )
}

// ── Hàm bổ sung (chỉ thêm mới, không thay đổi các hàm ở trên) ─────────────

/** Danh mục dạng chuỗi bài học có lộ trình (key bắt đầu bằng 'KH_'). */
export const isCourseCategory = (category) => String(category || '').startsWith('KH_')

/**
 * Đếm số bài theo danh mục → [{ name, count }].
 * Giữ thứ tự xuất hiện đầu tiên trong `posts` (posts sắp mới nhất trước → danh mục có bài mới nhất đứng đầu).
 */
export const countPostsByCategory = (posts) => {
    const counts = new Map()
    for (const post of posts || []) {
        const name = post?.frontmatter?.category
        if (!name) continue
        counts.set(name, (counts.get(name) || 0) + 1)
    }
    const result = []
    counts.forEach((count, name) => result.push({ name, count }))
    return result
}

/** Ước tính số phút đọc từ nội dung Markdown thô (≈ 200 từ/phút, tối thiểu 1 phút). */
export const readingTime = (text, wordsPerMinute = 200) => {
    const words = String(text || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean).length
    return Math.max(1, Math.round(words / wordsPerMinute))
}
