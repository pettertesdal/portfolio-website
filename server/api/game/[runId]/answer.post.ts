import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

// shared generator (server + client must match!)
function generateDate(seed: string, index: number, difficulty: number): Date {
  const rng = require("seedrandom")(seed + "-" + index)

  let year
  switch (difficulty) {
    case 0:
      year = new Date().getFullYear()
      break
    case 1:
      year = 1900 + Math.floor(rng() * 200)
      break
    case 2:
      year = 1000 + Math.floor(rng() * 1100)
      break
  }

  const month = Math.floor(rng() * 12)
  const day = Math.floor(rng() * 31) + 1
  return new Date(year, month, day)
}

function weekdayName(date: Date): string {
  return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][date.getDay()]
}

export default defineEventHandler(async (event) => {
  const runId = event.context.params?.runId
  const body = await readBody<{ index: number; answer: string }>(event)

  const run = await prisma.run.findUnique({ where: { id: runId } })
  if (!run) throw createError({ statusCode: 404, statusMessage: "Run not found" })
  if (run.finished) throw createError({ statusCode: 400, statusMessage: "Run already finished" })

  // server generates the expected date
  const date = generateDate(run.seed, body.index, run.difficulty)
  const correct = weekdayName(date)

  let score = run.score
  let mistakes = run.mistakes
  let finished = run.finished
  let index = run.index + 1

  if (body.answer.toLowerCase() === correct) {
    score += 10 // or difficulty-based
  } else {
    mistakes += 1
    if (mistakes >= 3) finished = true
  }

  const updated = await prisma.run.update({
    where: { id: runId },
    data: { score, mistakes, index, finished },
  })

  return {
    index: updated.index,
    score: updated.score,
    mistakes: updated.mistakes,
    finished: updated.finished,
  }
})

