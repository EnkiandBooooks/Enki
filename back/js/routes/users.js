import { Router } from "express";
import { mailRouter } from "./users/mails.js";
import { registerRouter } from "./users/register.js";
import { loginRouter } from "./users/login.js";
import { refreshRouter } from "./users/refresh.js";
import { dataRouter } from "./users/data.js";
import { resetPswdRouter } from "./users/resetPswd.js";

export const usersRouter = Router();

usersRouter.use('/mail', mailRouter);
usersRouter.use('/register', registerRouter);
usersRouter.use('/login', loginRouter);
usersRouter.use('/resetPswd', resetPswdRouter);
usersRouter.use('/refresh', refreshRouter);
usersRouter.use('/data', dataRouter);
