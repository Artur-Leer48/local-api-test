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

app.get("/api/pcs/:id", async(request, reply) => {
  const id = Number(request.params.id);

  const pc = await prisma.gamingPc.findUnique({
    where: {
      id: id
    }
  });

  if(pc === null){
    reply.code(404);

    return {
      message: `Gaming PC with ID ${id} was not found`
    };
  }

  return pc;
});


app.patch("/api/pcs/:id", async (request, reply) => {
  const id = Number(request.params.id);

  const updatedPc = await prisma.gamingPc.update({
    where: {
      id: id,
    },
    data: request.body,
  });

  return updatedPc;
});

app.listen({
  port: 8000,
  host: "127.0.0.1",
});