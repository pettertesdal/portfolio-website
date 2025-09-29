export default defineEventHandler((event) => {
  // Allow only your game frontend
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "https://doomsday.tesdal.dev",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  // Handle preflight requests
  if (getMethod(event) === "OPTIONS") {
    event.node.res.statusCode = 204;
    return "ok";
  }
});

