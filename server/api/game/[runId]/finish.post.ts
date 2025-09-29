import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const runId = event.context.params?.runId
  const body = await readBody<{ name: string }>(event)

  const run = await prisma.run.findUnique({ where: { id: runId } })
  if (!run) throw createError({ statusCode: 404, statusMessage: "Run not found" })
  if (!run.finished) throw createError({ statusCode: 400, statusMessage: "Run not finished yet" })

  await prisma.score.create({
    data: {
      name: body.name || "Anon",
      score: run.score,
      difficulty: run.difficulty,
    },
  })

  return { success: true }
})

