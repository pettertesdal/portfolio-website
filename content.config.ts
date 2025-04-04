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
    }),
    workposts: defineCollection({
      type: 'page',
      source: 'work/*.md',
      schema: z.object({
        date: z.string(),
        rawbody: z.string(),
        excerpt: z.object({
          type: z.string(),
          children: z.any(),
        }),
      })
    }),
    languageposts: defineCollection({
      type: 'page',
      source: 'skills/languages/*.md',
      schema: z.object({
        date: z.string(),
        rawbody: z.string(),
        excerpt: z.object({
          type: z.string(),
          children: z.any(),
        }),
      })
    }),
    technologyposts: defineCollection({
      type: 'page',
      source: 'skills/technologies/*.md',
      schema: z.object({
        date: z.string(),
        rawbody: z.string(),
        excerpt: z.object({
          type: z.string(),
          children: z.any(),
        }),
      })
    }),
    projectposts: defineCollection({
      type: 'page',
      source: 'projects/*.md',
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

