import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.get("/hello", async (request, reply) => {
  return {
    message: "Hallo vom lokalen API Server",
  };
});

app.listen({
  port: 8000,
  host: "127.0.0.1",
});

app.get("/bye",async(request, reply) => {
    return {
        message: "Bye bye"
    };
});