// server/api/leaderboard.ts
let leaderboard: { name: string; score: number }[] = [];

export default defineEventHandler(async (event) => {
  if (event.req.method === "GET") {
    // Return top 10 scores
    return leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
  }

  if (event.req.method === "POST") {
    const body = await readBody<{ name: string; score: number }>(event);
    leaderboard.push(body);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10); // keep top 10
    return leaderboard;
  }
});

