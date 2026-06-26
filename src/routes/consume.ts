import { Router } from "express";
import { consumeController } from "../controller/consumeController.js";
import { validateRequest } from "../middleware/validateRequets.js";

export const consume_Router: Router = Router()


consume_Router.post("/" ,validateRequest, consumeController)