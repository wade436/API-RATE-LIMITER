import { Router } from "express";
import { checkController } from "../controller/checkController.ts";
import { validateRequest } from "../middleware/validateRequets.ts";

export const check_Router: Router = Router()


check_Router.post("/",validateRequest, checkController)
