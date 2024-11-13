import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { WorkspaceController } from "../../controllers/workspaces/workspaces.js";

/**
 * Router para gestionar las rutas relacionadas con los workspaces.
 * 
 * - `POST /` - Recibe los datos de la creación de workspaces.
 * 
 * @module workspacesRouter
 * @type {Router}
 */
export const workspacesRouter = Router();
  
  // Ruta donde recibe los datos para crear 
  workspacesRouter.post('/create', WorkspaceController.createWorkspace);