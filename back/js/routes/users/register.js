import { Router } from "express";
import { RegisterController } from "../../controllers/users/register.js";

/**
 * Router para gestionar la ruta relacionada con el registro de usuarios.
 * 
 * - `POST /` - Registra un nuevo usuario.
 * 
 * @module registerRouter
 * @type {Router}
 */
export const registerRouter = Router();

registerRouter.post('/', RegisterController.getUsrPwd);