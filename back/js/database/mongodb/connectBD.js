import 'dotenv/config';
import mongoose from 'mongoose';

/**
 * Establece una conexión a la base de datos de MongoDB utilizando la URI proporcionada en las variables de entorno.
 * 
 * @function connectDB
 * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando la conexión es exitosa o se rechaza en caso de error.
 * 
 * @example
 * // Ejemplo de uso para conectar a la base de datos
 * connectDB()
 *   .then(() => console.log("Conexión exitosa"))
 *   .catch((error) => console.error("Error de conexión", error));
 */
export const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    setTimeout(connectDB, 5000); // Reintenta la conexión después de 5 segundos
  });
};