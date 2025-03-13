import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  content: {
    build: {
      markdown: {
        toc: {
          depth: 1,
        }
      }
    },
  },
  collections: {
    blogposts: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        date: z.string(),
        rawbody: z.string(),
        excerpt: z.object({
          type: z.string(),
          children: z.any(),
        }),
      })
    })
  }
})

