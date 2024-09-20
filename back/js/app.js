import express from "express"; //importamos express
import cors from "cors";
import 'dotenv/config';
import { mailRouter } from "./routes/mails.js";
import { registerRouter } from "./routes/register.js";
import { RegisterModel } from "./models/mongodb/register.js";
import { resetPswdRouter } from "./routes/resetPswd.js";
import { loginRouter } from "./routes/login.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use('/mail', mailRouter);
app.use('/register', registerRouter);
app.use('/resetPswd', resetPswdRouter);
app.use('/login', loginRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running on port http://localhost:${process.env.PORT}`);
});