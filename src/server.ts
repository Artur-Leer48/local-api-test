import Fastify from "fastify";
import { prisma } from "./db/prisma.ts";
import { registerPcRoutes } from "./routes/pc.routes.ts";

const app = Fastify({
  logger: true,
});

app.get("/health", async (request, reply) => {
  await prisma.$queryRaw`SELECT 1`;

  return {
    status: "ok",
    database: "ok",
  };
});

app.get("/hello", async (request, reply) => {
  return {
    message: "Hallo vom lokalen API Server",
  };
});

app.get("/bye", async (request, reply) => {
  return {
    message: "Bye bye",
  };
});

await registerPcRoutes(app);

app.listen({
  port: 8000,
  host: "127.0.0.1",
});
