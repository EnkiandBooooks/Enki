import { Router } from "express";
import { RegisterController } from "../controllers/register.js";

export const registerRouter = Router();

registerRouter.post('/', RegisterController.getUsrPwd);