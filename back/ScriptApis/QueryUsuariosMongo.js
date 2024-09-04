const axios = require('axios');
const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config()

const mongoUri = process.env.MONGO_URI;
const mongoClient = new MongoClient(mongoUri);

async function insertUser(jsonData) {
    try {
        await mongoClient.connect();
        console.log("--------------------------------------------------")
        console.log("Conectado correctamente al servidor")

        const database = mongoClient.db('applibros');
        const collection = database.collection('usuarios');

        const { userName, mail, password } = jsonData;
        
        if (!userName || !mail || !password){
            throw new Error("El JSON necesita los campos: userName mail y password");
        }
        const nuevoUsuario = {
            userName,
            mail,
            password,
        };
      
        const insert = await collection.insertOne(nuevoUsuario0);
        console.log("-------------------------------------------------\n")
        console.log("Usuario insertado a la base de datos:", insert.insertedID);
    } catch(error){
      console.log(error);
    } 
    finally {
      console.log("--------------------------------------------------\n")
      await mongoClient.close();
    }
}

const usuarioJSON = {
    userName: 'johndoe',
    mail: 'johndoe@example.com',
    password: 'securepassword123'
};
   

insertUser(usuarioJSON);
