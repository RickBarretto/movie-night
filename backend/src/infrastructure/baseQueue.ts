import { Queue } from "bullmq";
import { redisConfig } from "./redisConfig.ts";

export const baseQueue = new Queue("baseQueue", {
  connection: redisConfig,
});

export const destroyQueue = async () => {
  try {
    await baseQueue.obliterate({ force: true });
    console.log("BaseQueue queue successfully destroyed.");
  } catch (error) {
    console.error("Error destroying baseQueue queue:", error);
  }
};
