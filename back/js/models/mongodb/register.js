import { connect } from "./connectBD.js";

/**
 * Clase RegisterModel para gestionar las operaciones de la base de datos relacionadas con el registro de usuarios.
 */
export class RegisterModel {
    /**
     * Inserta un nuevo usuario en la colección 'usuarios'.
     *
     * @param {Object} nuevoUsuario - Un objeto que representa al nuevo usuario que se va a insertar.
     * @returns {Promise<void>} - Una promesa que se resuelve cuando el usuario ha sido insertado.
     */
    static async insertarUsuario(nuevoUsuario) {
        const db = await connect('usuarios');       // Conecta a la colección 'usuarios' de la base de datos
        // Inserta el nuevo usuario en la colección
        const create = await db.insertOne(nuevoUsuario); // Equivalente a una operación SQL "INSERT INTO"
    }
}
