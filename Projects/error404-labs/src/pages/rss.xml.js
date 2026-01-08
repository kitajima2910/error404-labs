import rss from '@astrojs/rss'
import { formatBlogPost } from '../js/utils'
import { TC_TITLE } from '../common/TextConst'

export async function GET(context) {
    const allPosts = Object.values(
        import.meta.glob('./bai-viet/*.md', { eager: true }),
    )

    const blog = formatBlogPost(allPosts, {
        limit: allPosts.length,
        filterOutDrafts: true,
        sortByDate: true,
    })

    console.log(blog)

    // return new Response('')
    return rss({
        stylesheet: '/rss/styles.xsl',
        title: 'Error404-Labs Blog',
        description: `${TC_TITLE}`,
        site: context.site,
        items: blog.map((post) => ({
            title: post.frontmatter.title,
            pubDate: post.frontmatter.date,
            description: post.frontmatter.description,
            // Compute RSS link from post `id`
            // This example assumes all posts are rendered as `/blog/[id]` routes
            link: post.url,
            customData: `
                <author>${post.frontmatter.author}</author>
            `,
        })),
    })
}
