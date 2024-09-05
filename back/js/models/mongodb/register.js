import { MongoClient } from 'mongodb';
import 'dotenv/config';

const client = new MongoClient(process.env.MONGO_URI);

async function connect () {
    try {
        await client.connect();

        const database = client.db('applibros');
        console.log("BASE DE DATOS CONECTADA!")
        return database.collection('usuarios');
        
    } catch (error) {
        console.error('Error al conectar a la base de datos.');
        console.error(error);
    }
}

export class RegisterModel {
    static async insertarUsuario (nuevoUsuario){
        const db = await connect();
        const create = await db.insertOne(nuevoUsuario);
    }
}