import type { FastifyInstance } from "fastify";
import { Prisma } from "../../generated/prisma/client.ts";
import { prisma } from "../db/prisma.ts";
import {
  createGamingPcSchema,
  routeParamsSchema,
  updateGamingPcSchema,
  type CreateGamingPcBody,
  type PcRouteParams,
  type UpdateGamingPcBody,
} from "../schemas/pc.schemas.ts";

export async function registerPcRoutes(app: FastifyInstance) {
  app.get("/api/pcs", async (request, reply) => {
    const pcs = await prisma.gamingPc.findMany();

    return pcs;
  });

  app.post<{ Body: CreateGamingPcBody }>("/api/pcs", async (request, reply) => {
    const parseResult = createGamingPcSchema.safeParse(request.body);

    if (!parseResult.success) {
      reply.code(400);

      return {
        message: "Invalid request body",
        errors: parseResult.error.issues,
      };
    }

    const newPc = await prisma.gamingPc.create({
      data: parseResult.data,
    });

    reply.code(201);

    return newPc;
  });

  app.get<{ Params: PcRouteParams }>("/api/pcs/:id", async (request, reply) => {
    const paramsResult = routeParamsSchema.safeParse(request.params);

    if (!paramsResult.success) {
      reply.code(400);

      return {
        message: "Invalid route params",
        errors: paramsResult.error.issues,
      };
    }

    const id = paramsResult.data.id;

    const pc = await prisma.gamingPc.findUnique({
      where: {
        id,
      },
    });

    if (pc === null) {
      reply.code(404);

      return {
        message: `Gaming PC with ID ${id} was not found`,
      };
    }

    return pc;
  });

  app.patch<{ Params: PcRouteParams; Body: UpdateGamingPcBody }>(
    "/api/pcs/:id",
    async (request, reply) => {
      const paramsResult = routeParamsSchema.safeParse(request.params);

      if (!paramsResult.success) {
        reply.code(400);

        return {
          message: "Invalid route params",
          errors: paramsResult.error.issues,
        };
      }

      const parseResult = updateGamingPcSchema.safeParse(request.body);

      if (!parseResult.success) {
        reply.code(400);

        return {
          message: "Invalid request body",
          errors: parseResult.error.issues,
        };
      }

      const id = paramsResult.data.id;

      try {
        const updatedPc = await prisma.gamingPc.update({
          where: {
            id,
          },
          data: parseResult.data,
        });

        return updatedPc;
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2025"
        ) {
          reply.code(404);

          return {
            message: `Gaming PC with ID ${id} was not found`,
          };
        }

        throw error;
      }
    },
  );

  app.delete<{ Params: PcRouteParams }>(
    "/api/pcs/:id",
    async (request, reply) => {
      const paramsResult = routeParamsSchema.safeParse(request.params);

      if (!paramsResult.success) {
        reply.code(400);

        return {
          message: "Invalid route params",
          errors: paramsResult.error.issues,
        };
      }

      const id = paramsResult.data.id;

      try {
        await prisma.gamingPc.delete({
          where: {
            id,
          },
        });

        reply.code(204);

        return;
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2025"
        ) {
          reply.code(404);

          return {
            message: `Gaming PC with ID ${id} was not found`,
          };
        }

        throw error;
      }
    },
  );
}
