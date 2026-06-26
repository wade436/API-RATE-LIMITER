import { Router } from "express";
import { checkController } from "../controller/checkController.js";
import { validateRequest } from "../middleware/validateRequets.js";

export const check_Router: Router = Router()


check_Router.post("/",validateRequest, checkController)
