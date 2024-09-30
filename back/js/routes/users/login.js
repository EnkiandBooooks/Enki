import { Router } from "express";
import { LoginController } from "../../controllers/users/login.js";

export const loginRouter = Router();

loginRouter.post('/', LoginController.loginUser);