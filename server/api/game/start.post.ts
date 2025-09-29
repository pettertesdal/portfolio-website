import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody<{ difficulty: number }>(event)

  if (isNaN(body.difficulty)) {
    throw createError({ statusCode: 400, statusMessage: "Difficulty required" })
  }

  const seed = crypto.randomUUID()

  const run = await prisma.run.create({
    data: {
      seed,
      difficulty: body.difficulty,
    },
  })

  return { runId: run.id, seed: run.seed, difficulty: run.difficulty }
})

