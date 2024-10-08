import { Router } from "express";
import { mailRouter } from "./users/mails.js";
import { registerRouter } from "./users/register.js";
import { loginRouter } from "./users/login.js";
import { refreshRouter } from "./users/refresh.js";
import { dataRouter } from "./users/data.js";
import { resetPswdRouter } from "./users/resetPswd.js";

/**
 * Router principal para gestionar todas las rutas relacionadas con las operaciones de usuario.
 * 
 * - `GET /mail` - Rutas relacionadas con el manejo de correos electrónicos.
 * - `POST /register` - Rutas relacionadas con el registro de nuevos usuarios.
 * - `POST /login` - Rutas relacionadas con el inicio de sesión.
 * - `POST /resetPswd` - Rutas relacionadas con el restablecimiento de contraseñas.
 * - `POST /refresh` - Rutas relacionadas con la regeneración de tokens de acceso.
 * - `GET/POST /data` - Rutas relacionadas con la obtención y modificación de datos de usuario.
 * 
 * @module usersRouter
 * @type {Router}
 */
export const usersRouter = Router();

usersRouter.use('/mail', mailRouter);
usersRouter.use('/register', registerRouter);
usersRouter.use('/login', loginRouter);
usersRouter.use('/resetPswd', resetPswdRouter);
usersRouter.use('/refresh', refreshRouter);
usersRouter.use('/data', dataRouter);
