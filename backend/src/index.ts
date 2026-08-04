import { Elysia } from "elysia";
import { node } from "@elysiajs/node";

const PORT = Number(process.env.PORT) || 3001

// node adapter required — CF runtime uses Node.js, not Bun
new Elysia({ adapter: node() })
  .get("/", () => ({ message: "Backend mock running" }))
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  .get("/entities", () => [
    { id: "1", name: "Entity One", type: "mock" },
    { id: "2", name: "Entity Two", type: "mock" },
    { id: "3", name: "Entity Three", type: "mock" },
  ])
  .listen(PORT);

console.log(`Backend running at http://localhost:${PORT}`);
