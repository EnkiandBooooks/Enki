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
  workspacesRouter.post('/create', verifyJWT, WorkspaceController.createWorkspace);
  workspacesRouter.get('/:id', verifyJWT, WorkspaceController.getInfoWorkspace);
  workspacesRouter.delete('/:id', verifyJWT, WorkspaceController.deleteWorkspace);
  workspacesRouter.get('/addUser/:id', verifyJWT, WorkspaceController.addUserWorkspace);
  workspacesRouter.post('/deleteUser', verifyJWT, WorkspaceController.deleteUserWorkspace);
  workspacesRouter.get('/listUsers/:id', verifyJWT,WorkspaceController.showUsersWorkspace) ;