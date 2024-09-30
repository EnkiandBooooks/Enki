import { Router } from "express";
import { getBooksController } from "../../controllers/books/getAll.js";

export const getBooksRouter = Router();

getBooksRouter.get('/getAll', getBooksController.getAll);
getBooksRouter.get('/:id', getBooksController.getById);