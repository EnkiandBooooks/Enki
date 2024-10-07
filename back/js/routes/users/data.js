import { Router } from "express";
import { DataController } from "../../controllers/users/data.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { multerMiddleware } from "../../middlewares/multer.middleware.js";

/**
 * Router para gestionar las rutas relacionadas con los datos del usuario.
 * 
 * - `GET /` - Obtiene los datos del usuario autenticado.
 * - `POST /` - Modifica los datos del usuario y permite la carga de un archivo de imagen.
 * 
 * @module dataRouter
 * @type {Router}
 */
export const dataRouter = Router();
  
  // Ruta para obtener los datos del usuario
  dataRouter.get('/', verifyJWT, DataController.getData);
  
  // Ruta para modificar los datos del usuario y subir un archivo con el nombre original y restricción de tipos
  dataRouter.post('/', verifyJWT, multerMiddleware, DataController.modifyUser);