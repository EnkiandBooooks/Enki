import { Router } from "express";
import { DataController } from "../../controllers/users/data.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

export const dataRouter = Router();

dataRouter.get('/',verifyJWT, DataController.getData);