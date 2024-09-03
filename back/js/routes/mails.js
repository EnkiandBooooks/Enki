import { Router } from "express";
import { mailController } from "../controllers/mails.js";

export const mailRouter = Router();

mailRouter.post('/', mailController.recibirMail);

mailRouter.get('/codigo', mailController.enviarMail); // "/" es localhost:1234 y req sirve para enviar y res para recibir