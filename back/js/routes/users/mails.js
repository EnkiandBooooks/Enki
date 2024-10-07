import { Router } from "express";
import { MailController } from "../../controllers/users/mails.js";

/**
 * Router para gestionar las rutas relacionadas con el manejo de correos electrónicos.
 * 
 * - `POST /` - Envía un correo electrónico al usuario para confirmar su dirección de correo.
 * - `POST /codigo` - Verifica el código enviado al correo electrónico del usuario.
 * 
 * @module mailRouter
 * @type {Router}
 */
export const mailRouter = Router();

mailRouter.post('/', MailController.getMail);

mailRouter.post('/codigo', MailController.verifyCode);         // "/" es localhost:1234 y req sirve para enviar y res para recibir
