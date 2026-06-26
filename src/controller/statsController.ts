import type { Request, Response } from "express"
import { redisClient } from "../redis.ts"

export const statsController = async (req: Request, res: Response) => { 
  
    const key = req.params.key as string

    const entries = await redisClient.zrangebyscore(key, '-INF', '+INF', 'WITHSCORES')

    const count = await redisClient.zcard(key)

    const ttl = await redisClient.ttl(key)

    return res.status(200).json({
        key,
        entries,
        count,
        ttl
    })
}