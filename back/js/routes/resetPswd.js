import { Router } from "express";
import { resetPswdController } from "../controllers/resetpswd.js";


export const resetPswdRouter = Router();

resetPswdRouter.post('/', resetPswdController.recibirMailPswd);

resetPswdRouter.post('resetPswd3', resetPswdController.tokenPswd );
