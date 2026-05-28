import Fastify from "fastify";
import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const app = Fastify({
  logger: true,
});

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

app.get("/hello", async (request, reply) => {
  return {
    message: "Hallo vom lokalen API Server",
  };
});

app.get("/api/pcs", async (request, reply) =>{
  const pcs = await prisma.gamingPc.findMany();
  
  return pcs;
})

app.listen({
  port: 8000,
  host: "127.0.0.1",
});

app.get("/bye",async(request, reply) => {
    return {
        message: "Bye bye"
    };
});

app.post("/api/pcs", async(request, reply) => {
  const newPc = await prisma.gamingPc.create({
    data: request.body
  });
  
  reply.code(201);

  return newPc;
});