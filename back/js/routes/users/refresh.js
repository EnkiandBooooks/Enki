import { Router } from "express";
import { RefreshController } from "../../controllers/users/refresh.js";

/**
 * Router para gestionar la ruta relacionada con la regeneración de tokens de acceso.
 * 
 * - `POST /` - Regenera un token de acceso utilizando el token de actualización.
 * 
 * @module refreshRouter
 * @type {Router}
 */
export const refreshRouter = Router();
// La primera función es un middleware y la segunda ya es el controlador.
refreshRouter.post('/', RefreshController.refreshToken);