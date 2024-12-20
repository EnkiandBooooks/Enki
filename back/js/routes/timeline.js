import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { TimelineController } from "../controllers/workspaces/timeline.js";

export const timelineRouter = Router();

timelineRouter.post('/timelineInfo', verifyJWT, TimelineController.getInfoTimeline)