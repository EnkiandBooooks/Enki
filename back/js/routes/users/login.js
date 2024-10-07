import { Router } from "express";
import { LoginController } from "../../controllers/users/login.js";

/**
 * Router para gestionar las rutas relacionadas con el inicio de sesión de usuarios.
 * 
 * - `POST /` - Inicia sesión del usuario.
 * 
 * @module loginRouter
 * @type {Router}
 */

export const loginRouter = Router();

loginRouter.post('/', LoginController.loginUser);