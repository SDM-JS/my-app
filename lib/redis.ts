import { Redis } from "ioredis"

import { useClerk } from "@clerk/nextjs";

export const redis = new Redis(process.env.REDIS_URL!)