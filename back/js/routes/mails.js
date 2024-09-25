import { Router } from "express";
import { MailController } from "../controllers/mails.js";
import { resetPswdController } from "../controllers/resetPswd.js";

export const mailRouter = Router();

mailRouter.post('/', MailController.getMail);

mailRouter.post('/codigo', MailController.verifyCode);         // "/" es localhost:1234 y req sirve para enviar y res para recibir
