import { Router } from "express";
import { getBooksRouter } from "./books/books.js";

export const booksRouter = Router();

booksRouter.use('/', getBooksRouter);
