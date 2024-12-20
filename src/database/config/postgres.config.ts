import { config } from "dotenv";

config();

export const databasePostgresConfig = {
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};
