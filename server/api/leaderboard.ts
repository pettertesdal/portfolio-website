import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = event.req.method

  if (method === "GET") {
    const query = getQuery(event)
    const difficulty = parseInt(query.difficulty as string)

    if (isNaN(difficulty)) {
      throw createError({ statusCode: 400, statusMessage: "Difficulty required" })
    }

    return await prisma.score.findMany({
      where: { difficulty },
      orderBy: { score: "desc" },
      take: 10,
    })
  }

  if (method === "POST") {
    const body = await readBody<{ name: string; score: number; difficulty: number }>(event)
    const difficulty = parseInt(body.difficulty as any)

    if (isNaN(difficulty)) {
      throw createError({ statusCode: 400, statusMessage: "Difficulty required" })
    }

    await prisma.score.create({
      data: {
        name: body.name,
        score: body.score,
        difficulty,
      },
    })

    return await prisma.score.findMany({
      where: { difficulty },
      orderBy: { score: "desc" },
      take: 10,
    })
  }
})

