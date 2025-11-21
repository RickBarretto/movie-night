import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { config } from "../../config.js";
import { bullBoardServer } from "../../infrastructure/bullBoard.js";

import { healthRoutes } from "./routes/healthRoutes.js";
import { roomsRoutes } from "./routes/rooms.ts"

export const makeServer = async () => {
  const server = fastify({ logger: config.http.logger[config.env] });

  await server.register(cors, {
    origin: "*",
  });

  server.register(swagger, {
    openapi: {
      info: {
        title: "Movie Night API",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  });
  server.register(swaggerUi, { routePrefix: "/docs" });

  server.get("/", async (_request, reply) => {
    return reply.redirect("/docs", 301);
  });

  await server.register(fastifyJwt, {
    secret: config.secrets.jwtSecret,
  });

  server.register(healthRoutes);
  server.register(roomsRoutes);

  // bullBoardServer.listen(3001, () => {
  //   console.log("BullMQ UI running http://localhost:3001/admin/queues");
  // });

  return server;
};
