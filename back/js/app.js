import express from "express"; //importamos express
import cors from "cors";
import 'dotenv/config';
import { mailRouter } from "./routes/mails.js";
import { registerRouter } from "./routes/register.js";
import { loginRouter } from "./routes/login.js";
import { resetPswdRouter } from "./routes/resetPswd.js";
import { refreshRouter } from "./routes/refresh.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/mail', mailRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/resetPswd', resetPswdRouter);
app.use('/refresh', refreshRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running on port http://localhost:${process.env.PORT}`);
});