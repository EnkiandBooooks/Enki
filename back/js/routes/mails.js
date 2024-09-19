import { Router } from "express";
import { mailController } from "../controllers/mails.js";

export const mailRouter = Router();

mailRouter.post('/', mailController.recibirMail);

mailRouter.post('/codigo', mailController.verificarCodigo);         // "/" es localhost:1234 y req sirve para enviar y res para recibir