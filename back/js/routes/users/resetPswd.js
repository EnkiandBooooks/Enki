import { Router } from "express";
import { resetPswdController } from "../../controllers/users/resetPswd.js";


export const resetPswdRouter = Router();

resetPswdRouter.post('/', resetPswdController.recibirMailPswd);

resetPswdRouter.post('/:tokenPswd', resetPswdController.newPassword);
