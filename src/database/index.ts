import {Knex, knex} from "knex";
import dotenv from "dotenv";

dotenv.config({ path: `.env` });

const knexPostgresConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT || 5432),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  pool: {
    min: 0,
    max: 100,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false,
  },
};

export const knexInstance = knex(knexPostgresConfig);
export { Entity } from "./entity.enum";
