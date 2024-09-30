import dotenv from 'dotenv';
// import 'dotenv/config';
import mongoose from 'mongoose';
dotenv.config({path: '../../.env'});

mongoose.connect(process.env.MONGO_URI,)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error conectando MongoDB', err));
