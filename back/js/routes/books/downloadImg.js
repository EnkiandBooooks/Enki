import { Router } from "express";
import { downloadImgController } from "../../controllers/books/downloadImg.js";
export const downloadImgRouter = Router();
downloadImgRouter.post('/booksImg', downloadImgController.recibirImg);