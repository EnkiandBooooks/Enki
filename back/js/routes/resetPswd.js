import { Router } from "express";
import { resetPswdController } from "../controllers/resetPswd.js";


export const resetPswdRouter = Router();

resetPswdRouter.post('/', resetPswdController.recibirMailPswd);
