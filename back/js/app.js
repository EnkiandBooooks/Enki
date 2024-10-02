import express from "express"; //importamos express
import cors from "cors";
import 'dotenv/config';
import { usersRouter } from "./routes/users.js";
import { booksRouter } from "./routes/books.js";
import { cuttImgRouter } from "./routes/cutImg/cuttImg.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/', cuttImgRouter);


app.listen(process.env.PORT, () => {
    console.log(`server running on port http://localhost:${process.env.PORT}`);
});