import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    // Top 10 scores
    return prisma.score.findMany({
      orderBy: { score: 'desc' },
      take: 10
    })
  }

  if (event.req.method === 'POST') {
    const body = await readBody<{ name: string, score: number }>(event)

    // Insert score
    await prisma.score.create({
      data: {
        name: body.name,
        score: body.score
      }
    })

    // Return updated top 10
    return prisma.score.findMany({
      orderBy: { score: 'desc' },
      take: 10
    })
  }
})
