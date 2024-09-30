import { Router } from "express";
import { RegisterController } from "../../controllers/users/register.js";

export const registerRouter = Router();

registerRouter.post('/', RegisterController.getUsrPwd);