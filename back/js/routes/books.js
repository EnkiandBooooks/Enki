import { Router } from "express";
import { getBooksRouter } from "./books/books.js";


/**
 * Router principal para gestionar todas las rutas relacionadas con los libros.
 * 
 * - Utiliza `getBooksRouter` para manejar las rutas de obtención de libros.
 * 
 * @module booksRouter
 * @type {Router}
 */
export const booksRouter = Router();

booksRouter.use('/', getBooksRouter);
