import { redisClient } from "../redis.ts"


//what is the return type of the specific lua script?
interface checkCount {
    count: number,
    remaining: number
}

//what is the function that's going to be called in the controller
export const checkCount = async (key: string, limit: number, window: number): Promise<checkCount> => {

    //set redisClient as any and the return type as the an array of the return values
    const result = await (redisClient as any).checkCount(key, limit, window) as [number, number]

    return {
        count: result[0],
        remaining: result[1]
    }
}