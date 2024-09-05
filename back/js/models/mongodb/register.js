import { connect } from "./connectBD.js";

export class RegisterModel {
    static async insertarUsuario (nuevoUsuario){
        const db = await connect('usuarios');
        const create = await db.insertOne(nuevoUsuario);
    }
}