import type { NextFunction, Request, Response } from "express";



export const validateRequest = (req: Request, res: Response, next: NextFunction) => {

    const { key, limit, window } = req.body
    
    if (!key || typeof key !== 'string') {
         return res
           .status(400)
           .json({ error: "key is required and must be a string" });
    }

    if (!limit || typeof limit !== 'number') {
         return res
           .status(400)
           .json({ error: "limit is required and must be a number" });
    }


        if (!window || typeof window !== 'number') {
         return res
           .status(400)
           .json({ error: "window is required and must be a number" });
    }


    next()

}
