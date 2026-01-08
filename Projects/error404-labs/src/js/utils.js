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
        postsClone = postsClone.sort((a, b) => Math.random() - 0.5)
    }

    if (filterOutDrafts) {
        postsClone = postsClone.filter((post) => !post.frontmatter.draft)
    }

    return postsClone.slice(
        0,
        limit < postsClone.length ? limit : postsClone.length,
    )
}
