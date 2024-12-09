import { Router } from "express";
import { UrlInvitationController } from "../../controllers/workspaces/urlInvitation.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

export const urlInvitationRoute = Router();

urlInvitationRoute.get('/', UrlInvitationController.checkWorkspaceId);