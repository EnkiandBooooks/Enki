import { Router } from "express";
import { workspacesRouter } from "./workspace/workspaces.js";

/**
 * Router principal para gestionar todas las rutas relacionadas con los workspaces.
 * 
 * - Utiliza `getBooksRouter` para manejar las rutas de creación  de workspaces.
 * 
 * @module workspaceRouter
 * @type {Router}
 */
export const workspaceRouter = Router();

workspaceRouter.use('/', workspacesRouter);
