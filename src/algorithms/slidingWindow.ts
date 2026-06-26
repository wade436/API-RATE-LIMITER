import { redisClient } from "../redis.ts";


// The return type from lua comes back as an array [allowed, count, remaining]
interface slidingWindow {
  allowed: boolean;
  count: number;
  remaining: number;
}

export const checkSlidingWindow = async (
  key: string,
  limit: number,
  window: number,
): Promise<slidingWindow> => {
  // we use [number, number, number] because the lua script will return an array
  const result = (await (redisClient as any).slidingWindow(
    key,
    limit,
    window,
  )) as [number, number, number];

  return {
    allowed: result[0] === 1,
    count: result[1],
    remaining: result[2],
  };
};
