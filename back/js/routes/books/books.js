import { Router } from "express";
import { getBooksController } from "../../controllers/books/getAll.js";

/**
 * Router para gestionar las rutas relacionadas con la obtención de libros.
 * 
 * - `GET /` - Obtiene todos los libros que coincidan con el criterio de búsqueda opcional.
 * - `GET /:id` - Obtiene un libro específico por su ID.
 * 
 * @module getBooksRouter
 * @type {Router}
 */
export const getBooksRouter = Router();

getBooksRouter.get('/', getBooksController.getAll);
getBooksRouter.get('/:id', getBooksController.getById);