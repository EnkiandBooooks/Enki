import { Router } from "express";
import { resetPswdController } from "../../controllers/users/resetPswd.js";

/**
 * Router para gestionar las rutas relacionadas con el restablecimiento de contraseñas de usuarios.
 * 
 * - `POST /` - Envía un correo electrónico para restablecer la contraseña del usuario.
 * - `POST /:tokenPswd` - Permite al usuario actualizar su contraseña utilizando un token de restablecimiento.
 * 
 * @module resetPswdRouter
 * @type {Router}
 */
export const resetPswdRouter = Router();

resetPswdRouter.post('/', resetPswdController.recibirMailPswd);

resetPswdRouter.post('/:tokenPswd', resetPswdController.newPassword);
