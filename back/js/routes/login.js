import { Router } from "express";
import { loginControler } from "../controllers/login";

export const loginRouter = Router();

loginRouter.post('/', loginControler);