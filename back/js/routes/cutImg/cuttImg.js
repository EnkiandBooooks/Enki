import { Router } from "express";
import { cuttImgController } from "../../controllers/cuttImg/cuttImg.js";
export const cuttImgRouter = Router();

cuttImgRouter.post('/booksImg', cuttImgController.recibirImg);