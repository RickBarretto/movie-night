import type { Knex } from "knex";
import BaseModel from "../models/baseModel.js";

export async function seed(knex: Knex): Promise<void> {
  BaseModel.knex(knex);
}
