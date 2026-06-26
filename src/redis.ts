import Redis from "ioredis";
import fs from "fs"
import { join } from "path" 

//initialize redis
export const redisClient = new Redis();

//load the lua script in nodejs
const slidingWindowScript = fs.readFileSync(join( import.meta.dirname, '../scripts/slidingWindow.lua'), 'utf8')
//create the redis command to run the lua script 
redisClient.defineCommand('slidingWindow', {
    numberOfKeys: 1,
    lua: slidingWindowScript
})


//load the lua script into nodejs
const checkCount = fs.readFileSync(join( import.meta.dirname, '../scripts/checkCount.lua'), 'utf8')
//create the redis command to run the lua script
redisClient.defineCommand('checkCount', {
    numberOfKeys: 1,
    lua: checkCount
})

