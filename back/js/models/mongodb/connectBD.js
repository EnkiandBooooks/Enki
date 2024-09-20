import 'dotenv/config';
import { MongoClient } from 'mongodb';

/**
 * Crea una nueva instancia de MongoClient utilizando la URI de conexión almacenada en las variables de entorno.
 */
const client = new MongoClient(process.env.MONGO_URI);

/**
 * Conecta a la base de datos MongoDB y devuelve una colección específica.
 *
 * @param {string} collection - El nombre de la colección a la que se desea conectar.
 * @returns {Promise<Object>} - La colección de la base de datos especificada.
 * @throws {Error} - Si ocurre un error al intentar conectarse a la base de datos.
 */
export async function Connect(collection) {
    try {
        await client.connect();     // Conecta el cliente a la base de datos

        // Selecciona la base de datos llamada 'applibros'
        const database = client.db('applibros');
        console.log("BASE DE DATOS CONECTADA!");

        // Devuelve la colección especificada por el parámetro 'coleccion'
        return database.collection(collection);

    } catch (error) {
        // Manejo de errores: imprime un mensaje de error si la conexión falla
        console.error('Error al conectar a la base de datos.');
        console.error(error);
    }
}
