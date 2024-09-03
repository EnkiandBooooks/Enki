import express from "express"; //importamos express
import cors from "cors";
import { mailRouter } from "./routes/mails.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 1234; //creamos el puerto

app.use('/mail/codigo', mailRouter);

app.use('/mail', mailRouter);

app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`);
});