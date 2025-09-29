export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "https://doomsday.tesdal.dev",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  if (getMethod(event) === "OPTIONS") {
    event.node.res.statusCode = 204;
    return "ok";
  }
});

