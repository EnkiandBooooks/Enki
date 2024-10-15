import { BooksModel } from "../../database/mongodb/books.js";

/**
 * Controlador para gestionar operaciones relacionadas con libros.
 * 
 * @class getBooksController
 */
export class getBooksController{
    /**
     * Obtiene una lista de libros que coinciden con el nombre de búsqueda proporcionado en la consulta.
     * Si no se proporciona un parámetro de búsqueda, devuelve todos los libros.
     * 
     * @static
     * @async
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} req.query - Parámetros de consulta.
     * @param {string} [req.query.searchBy] - Término de búsqueda para filtrar los libros por título.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} Devuelve una respuesta JSON con la lista de libros.
     * 
     * @example
     * // Ejemplo de solicitud
     * // GET
     * getBooksController.getAll(req, res);
     */
    static async getAll(req, res){

        let bookName = new RegExp(`.*${req.query.searchBy || ''}.*`);
        const result = await BooksModel.getBooks({"title": {$regex: bookName, $options: "i  "}})
        res.json(result)
    }
    /**
     * Obtiene un libro específico por su ID.
     * 
     * @static
     * @async
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} req.params - Parámetros de la URL.
     * @param {string} req.params.id - ID del libro a buscar.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} Devuelve una respuesta JSON con el libro correspondiente al ID proporcionado.
     * 
     * @example
     * // Ejemplo de solicitud
     * // GET
     * getBooksController.getById(req, res);
     */
    static async getById(req, res){
        const id = req.params.id;
        const idBook = id;
        const result = await BooksModel.searchById(id);
        res.json(result); 
    }
}