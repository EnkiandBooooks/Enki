import { Router } from "express";
import { registerController } from "../controllers/register.js";

export const registerRouter = Router();

registerRouter.post('/', registerController.recibirUsrPwd);