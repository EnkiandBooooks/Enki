import { ObjectId } from "mongodb";
import { BooksModel } from "../../database/mongodb/books.js";

export class getBooksController{
    static async getAll(req, res){
        const result = await BooksModel.getBooks()
        res.json(result)
    }

    static async getById(req, res){
        const id = req.params.id;
        const idBook = new ObjectId(id);
        const result = await BooksModel.searchById({'_id': idBook});
        res.json(result); 
    }
}