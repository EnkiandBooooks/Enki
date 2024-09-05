import 'dotenv/config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);

export async function connect (coleccion) {
    try {
        await client.connect();

        const database = client.db('applibros');
        console.log("BASE DE DATOS CONECTADA!")
        return database.collection(coleccion);
        
    } catch (error) {
        console.error('Error al conectar a la base de datos.');
        console.error(error); 
    }
}