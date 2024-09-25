import { Router } from "express";
import { resetPswdController } from "../controllers/resetPswd.js";


export const resetPswdRouter = Router();

resetPswdRouter.post('/resetPswd', resetPswdController.recibirMailPswd);

resetPswdRouter.post('/resetPswd3/:tokenPswd', resetPswdController.newPassword);
