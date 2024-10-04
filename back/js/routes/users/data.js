import { Router } from "express";
import { DataController } from "../../controllers/users/data.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { multerMiddleware } from "../../middlewares/multer.middleware.js";

  export const dataRouter = Router();
  
  // Ruta para obtener los datos del usuario
  dataRouter.get('/', verifyJWT, DataController.getData);
  
  // Ruta para modificar los datos del usuario y subir un archivo con el nombre original y restricción de tipos
  dataRouter.post('/', verifyJWT, multerMiddleware, DataController.modifyUser);