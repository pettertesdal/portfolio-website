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
    // --- New contract: { name, runId } ---
    const body = await readBody<{ name: string; runId: string }>(event)

    if (!body.name || !body.runId) {
      throw createError({ statusCode: 400, statusMessage: "Name and runId required" })
    }

    // Look up the run
    const run = await prisma.run.findUnique({ where: { id: body.runId } })
    if (!run) {
      throw createError({ statusCode: 400, statusMessage: "Invalid runId" })
    }

    // Recompute or validate the score
    // (for now, assume backend has already validated the run and stored the score)
    const { difficulty, score } = run

    try {
      await prisma.score.create({
        data: {
          name: body.name,
          score,
          difficulty,
        },
      })

      // Optionally: mark run as "submitted" to prevent reuse
      await prisma.run.update({
        where: { id: body.runId },
        data: { submitted: true },
      })
    } catch (err) {
      console.error("Prisma error:", err)
      throw createError({ statusCode: 500, statusMessage: "DB insert failed" })
    }

    return await prisma.score.findMany({
      where: { difficulty },
      orderBy: { score: "desc" },
      take: 10,
    })
  }
})

