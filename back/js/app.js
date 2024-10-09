import express from "express"; //importamos express
import cors from "cors";
import 'dotenv/config';
import { usersRouter } from "./routes/users.js";
import { booksRouter } from "./routes/books.js";
import { connectDB } from "./database/mongodb/connectBD.js";
const app = express();
app.use(cors());
app.use(express.json());

/**
 * Configura y ejecuta el servidor Express.
 * 
 * - Rutas:
 *   - `/users` - Rutas para gestionar usuarios.
 *   - `/books` - Rutas para gestionar libros.
 * 
 * - Conexión a MongoDB:
 *   - Se conecta a la base de datos y lanza un error si no es posible conectarse.
 * 
 * @module Server
 * @example
 * // Inicia el servidor en el puerto especificado en .env
 * // URL: http://localhost:{PORT}
 */
app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running on port http://localhost:${process.env.PORT}`);
});

await connectDB()
  .then(() => {
    console.log("Conexión exitosa a MongoDB, iniciando servidor...");
  })
  .catch(err => {
    console.error("Error conectando a la base de datos:", err);
    process.exit(1); // Salir de la aplicación si no se puede conectar
  });