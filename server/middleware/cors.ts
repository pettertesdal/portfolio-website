const allowedOrigins = ["https://doomsday.tesdal.dev"];

export default defineEventHandler((event) => {
  const origin = getHeader(event, "origin") || "";
  if (allowedOrigins.includes(origin)) {
    setHeader(event, "Access-Control-Allow-Origin", origin);
  }

  setHeader(event, "Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  setHeader(event, "Access-Control-Allow-Headers", "Content-Type");

  if (getMethod(event) === "OPTIONS") {
    event.node.res.statusCode = 204;
    return "ok";
  }
});

