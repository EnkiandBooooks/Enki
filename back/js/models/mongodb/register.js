import { Connect } from "./connectBD.js";

/**
 * Clase RegisterModel para gestionar las operaciones de la base de datos relacionadas con el registro de usuarios.
 */
export class RegisterModel {
    /**
    Inserta un nuevo usuario en la colección 'usuarios'.
    @param {Object} newUser - Un objeto que representa al nuevo usuario que se va a insertar.
    @returns {Promise<void>} - Una promesa que se resuelve cuando el usuario ha sido insertado.
     **/
    static async insertUser(newUser) {
        const db = await Connect('usuarios');       // Conecta a la colección 'usuarios' de la base de datos
        // Inserta el nuevo usuario en la colección
        const create = await db.insertOne(newUser); // Equivalente a una operación SQL "INSERT INTO"
    }

    static async searchUser(query){
        const db = await Connect('usuarios'); 
        const user = await db.findOne(query);
        return user
    }
}
