import type { Request, Response } from "express"
import { checkSlidingWindow } from "../algorithms/slidingWindow.ts"

export const consumeController = async (req: Request, res: Response) => { 

    console.log("inside the consume router")
    //extract key, limit and window values from request
    const { key, limit, window } = req.body

    //insert extracted values into the checkSlidingWindow funciton
    //store the return of the function into a result for easy access 
    const result = await checkSlidingWindow(key, limit, window)

    //check if the request has used up all its token window limits
    if (result.allowed === false) {
        return res.status(429).json({
            allowed: false,
            message: "Request limit exceeded",
            count: result.count,
            remaining: result.remaining
        })
    }
    //Otherwise continue if limits are still available and return the status
    //and the json object with the details of the request
    return res.status(200).json({
        allowed: true,
        count: result.count,
        remaining: result.remaining
    })
}