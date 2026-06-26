import { Router } from "express";
import { statsController } from "../controller/statsController.js";

export const stats_Router: Router = Router()

console.log('in here')
stats_Router.get("/:key", statsController)