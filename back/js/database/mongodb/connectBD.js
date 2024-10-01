import 'dotenv/config';
import mongoose from 'mongoose';

// Exporta una función que maneja la conexión a MongoDB
export const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Conectado a MongoDB');
    })
    .catch((err) => {
      console.log('Error conectando MongoDB', err);
      throw err; // Lanza el error si falla la conexión
    });
};
