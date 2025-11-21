import { FastifyInstance } from "fastify";

import { Rooms } from "infrastructure/repo/Rooms";

import { MovieSuggestion, newMovieID, Room } from "models.ts";

export function roomsRoutes(fastify: FastifyInstance) {
  let rooms: Rooms = new Rooms();

  fastify.post(
    "/rooms",
    {
      schema: {
        summary: "Hosts a new room.",
        body: {
          type: "object",
          required: ["username"],
          properties: { username: { type: "string" } },
        },
        response: {
          201: {
            type: "object",
            properties: {
              status: { type: "string" },
              room: { type: "string" },
              ownerKey: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const created: Room = await rooms.hostNew(request.body.username);

      return reply.status(201).send({
        status: "created",
        room: created.code,
        ownerKey: created.owner,
      });
    },
  );

  fastify.get(
    "/rooms/:code",
    {
      schema: {
        summary: "Gets a room by code.",
        params: {
          type: "object",
          required: ["code"],
          properties: { code: { type: "string" } },
        },
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string" },
              room: { type: "string" },
              host: { type: "string" },
              movies: {
                type: "array",
                items: {
                  type: "object",
                  required: ["id", "title", "by"],
                  properties: {
                    id: { type: "string" },
                    title: { type: "string" },
                    year: { type: "number" },
                    by: { type: "string" },
                  },
                },
              },
              state: { type: "string" },
              winner: {
                type: "object",
                required: ["id", "title", "by"],
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  year: { type: "number" },
                  by: { type: "string" },
                },
              },
            },
          },
          404: {
            type: "object",
            properties: { error: { type: "string" } },
          },
        },
      },
    },
    async (request, reply) => {
      const found: Room = await rooms.byCode(request.params.code);
      if (!found) {
        return reply.status(404).send({ error: "Room not found" });
      }
      return reply.send({
        status: "ok",
        room: found.code,
        host: found.host,
        movies: found.movies,
        state: found.state,
        winner: found.winner,
      });
    },
  );

  fastify.post(
    "/rooms/:code",
    {
      schema: {
        summary: "Suggests a movie for a room.",
        params: {
          type: "object",
          required: ["code"],
          properties: { code: { type: "string" } },
        },
        body: {
          type: "object",
          required: ["title", "username"],
          properties: {
            username: { type: "string" },
            title: { type: "string" },
            year: { type: "number" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: { status: { type: "string" } },
          },
          400: {
            type: "object",
            properties: { error: { type: "string" } },
          },
          404: {
            type: "object",
            properties: { error: { type: "string" } },
          },
        },
      },
    },
    async (request, reply) => {
      const room = await rooms.byCode(request.params.code);

      if (!room) {
        return reply.status(404).send({ error: "Room not found" });
      }

      if (room.isClosed()) {
        return reply.status(400).send({ error: "Room is closed" });
      }

      try {
        const movie: MovieSuggestion = {
          id: newMovieID(),
          by: request.body.username,
          title: request.body.title,
          year: request.body.year,
        };
        await rooms.suggestMovie(movie, request.params.code);
      } catch (error) {
        return reply.status(404).send({ error: "Room not found" });
      }

      return reply.send({ status: "ok" });
    },
  );

  fastify.post(
    "/rooms/:code/draw",
    {
      schema: {
        summary: "Draws a movie for a room.",
        params: {
          type: "object",
          required: ["code"],
          properties: { code: { type: "string" } },
        },
        body: {
          type: "object",
          required: ["username", "key"],
          properties: {
            username: { type: "string" },
            key: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string" },
              winner: {
                type: "object",
                required: ["id", "title", "by"],
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  year: { type: "number" },
                  by: { type: "string" },
                },
              },
            },
          },
          400: {
            type: "object",
            properties: { error: { type: "string" } },
          },
          401: {
            type: "object",
            properties: { error: { type: "string" } },
          },
          403: {
            type: "object",
            properties: { error: { type: "string" } },
          },
          404: {
            type: "object",
            properties: { error: { type: "string" } },
          },
        },
      },
    },
    async (request, reply) => {
      const room: Room = await rooms.byCode(request.params.code);
      console.log(room);
      if (!room) {
        return reply.status(404).send({ error: "Room not found" });
      }

      if (!room.isHost(request.body.username, request.body.key)) {
        return reply.status(403).send({ error: "Unauthorized" });
      }

      if (room.isClosed()) {
        return reply.status(400).send({ error: "Room is closed" });
      }

      try {
        const movie: MovieSuggestion = await rooms.drawWinner(
          request.params.code,
        );
        return reply.send({ status: "ok", winner: movie });
      } catch (error) {
        console.error(error);
        return reply.status(404).send({ error: "Room not found" });
      }
    },
  );
}
