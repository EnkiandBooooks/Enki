import { Router } from "express";
import { LoginController } from "../controllers/login.js";

export const loginRouter = Router();

loginRouter.post('/', LoginController.loginUser);