import { Router } from "express";
import { CommentsController } from "../../controllers/workspaces/comments.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

export const commentsRouter = Router();

commentsRouter.post('/create',verifyJWT, CommentsController.createComments);