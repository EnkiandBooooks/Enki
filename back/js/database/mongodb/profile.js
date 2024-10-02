import { Connect } from "./connectBD.js";
import { ObjectId } from "mongodb";
export class ProfileModel {

    static async getUserCreationDate(query){ //Extraer fecha de creación de usuario
        const db = await Connect('usuarios');
        const user = await db.findOne(query);
        console.log(user)
        const creationDate = new ObjectId(user._id).getTimestamp();
        return creationDate;
    }
}