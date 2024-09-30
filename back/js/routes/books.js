import { Router } from "express";
import { getBooksRouter } from "./books/list.js";

export const booksRouter = Router();

booksRouter.use('/list', getBooksRouter);
