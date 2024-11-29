import JSONCache from "redis-json";
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redis = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
});

const jsonRedis = new JSONCache(redis, { prefix: "cache:" });

export default jsonRedis;
