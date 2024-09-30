import { Connect } from "./connectBD.js";

export class BooksModel{
    static async getBooks(query){
        const db = await Connect('obras');
        const user = await db.find(query).toArray();
        return user
    } 

    static async searchById(query){
        const db = await Connect('obras');
        const user = await db.findOne(query);
        return user
    }
}