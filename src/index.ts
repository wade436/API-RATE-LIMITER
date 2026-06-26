import express from 'express'
import type { Express } from 'express'
import { check_Router } from './routes/check.js'
import { consume_Router } from './routes/consume.js'
import { stats_Router } from './routes/stats.js'




const port = process.env.PORT || 3000
const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/consume", consume_Router);

app.use("/check", check_Router);

app.use("/stats", stats_Router);


app.listen(port , ((): void => console.log(`listening on port ${port}`)))