import express from 'express';
import { check_Router } from './routes/check.js';
import { consume_Router } from './routes/consume.js';
import { stats_Router } from './routes/stats.js';
import { redisClient } from './redis.js';
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(await redisClient.ping());
// const test = await checkSlidingWindow("test:wade", 5, 60)
// console.log(test)
app.use("/consume", consume_Router);
app.use("/check", check_Router);
app.use("/stats", stats_Router);
app.listen(port, (() => console.log(`listening on port ${port}`)));
