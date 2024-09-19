import express from "express"; //importamos express
import cors from "cors";
import 'dotenv/config';
import { mailRouter } from "./routes/mails.js";
import { registerRouter } from "./routes/register.js";
import { RegisterModel } from "./models/mongodb/register.js";

const app = express();
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
=======

>>>>>>> 93a49cc84b7fd57f21acccc9c510974764a3d26b
app.use('/mail', mailRouter);
app.use('/register', registerRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running on port http://localhost:${process.env.PORT}`);
});