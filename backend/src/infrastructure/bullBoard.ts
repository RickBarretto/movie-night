import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { ExpressAdapter } from "@bull-board/express";
import express from "express";
import { baseQueue } from "./baseQueue.ts";

const server = express();
const bullBoard = new ExpressAdapter();

createBullBoard({
  queues: [new BullMQAdapter(baseQueue)],
  serverAdapter: bullBoard,
});

bullBoard.setBasePath("/admin/queues");

server.use("/admin/queues", bullBoard.getRouter());

export { server as bullBoardServer };
