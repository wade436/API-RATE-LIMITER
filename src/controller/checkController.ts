import { application, type Request, type Response } from "express"
import { checkCount } from "../algorithms/checkCount.ts"

export const checkController = async (req: Request, res: Response) => { 
    
    //destructure the output of the request
    const { key, limit, window } = req.body

    //call the lua/redis command to run the lua script
    const result = await checkCount(key, limit, window)

    //return the count
    return res.status(200).json({
        count: result.count,
        remaining: result.remaining
    })
}