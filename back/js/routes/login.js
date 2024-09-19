import { Router } from "express";
import { loginControler } from "../controllers/login.js";


export const loginRouter = Router();

loginRouter.post("/", loginControler.login);