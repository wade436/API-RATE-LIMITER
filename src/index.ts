import express from 'express'
import type { Express } from 'express'
import { check_Router } from './router/check.ts'
import { consume_Router } from './router/consume.ts'
import { stats_Router } from './router/stats.ts'
import { redisClient } from './redis.ts'



const port = process.env.PORT || 3000
const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

console.log(await redisClient.ping())

// const test = await checkSlidingWindow("test:wade", 5, 60)
// console.log(test)


app.use("/consume", consume_Router);

app.use("/check", check_Router);

app.use("/stats", stats_Router);


app.listen(port , ((): void => console.log(`listening on port ${port}`)))