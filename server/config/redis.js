import "dotenv/config";
import { Redis } from "@upstash/redis";

console.log("Redis URL loaded:", Boolean(process.env.UPSTASH_REDIS_REST_URL));

console.log(
  "Redis token loaded:",
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN),
);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

try {
  // Save data to Redis
  await redis.set("foo", "bar");

  // Retrieve data from Redis
  const result = await redis.get("foo");

  console.log("Redis result:", result);

  if (result === "bar") {
    console.log("Redis is working!");
  }
} catch (error) {
  console.error("Redis connection failed:", error);
}
