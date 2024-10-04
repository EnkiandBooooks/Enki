import express from "express"; //importamos express
import cors from "cors";
import 'dotenv/config';
import { usersRouter } from "./routes/users.js";
import { booksRouter } from "./routes/books.js";
import { connectDB } from "./database/mongodb/connectBD.js";
const app = express();
app.use(cors());
app.use(express.json());

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