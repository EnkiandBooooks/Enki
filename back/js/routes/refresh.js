import { Router } from "express";
import { RefreshController } from "../controllers/refresh.js";
import { verifyHeader } from "../middlewares/verifyHeader.middleware.js";

export const refreshRouter = Router();
// La primera función es un middleware y la segunda ya es el controlador.
refreshRouter.post('/', verifyHeader, RefreshController.refreshToken);