import { clean } from "knex-cleaner";
import { makeServer } from "../../api/http/server.js";
import { makeDatabase } from "../../infrastructure/database/database.js";

export const setupRouteTest = async () => {
  const server = await makeServer();
  const database = makeDatabase();

  // await database.connect({ log: false });

  return {
    server,
    cleanDatabase: () => clean(database.connection),
    tearDown: () => database.disconnect({ log: false }),
  };
};

export type RouteTest = Awaited<ReturnType<typeof setupRouteTest>>;
