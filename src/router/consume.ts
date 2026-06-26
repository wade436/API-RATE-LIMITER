import { Router } from "express";
import { consumeController } from "../controller/consumeController.ts";
import { validateRequest } from "../middleware/validateRequets.ts";

export const consume_Router: Router = Router()


consume_Router.post("/" ,validateRequest, consumeController)