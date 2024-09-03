import express from "express"; //importamos express
import cors from "cors";
import { EnviarMail } from "./enviarmail.js"; //improtamos EnviarMail y Random
import { getNumRandom } from "./random.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 1234; //creamos el puerto
let mail = "";

app.post("/recibirmail", (req, res) =>{ //creamos la funcion para recibir el mail
    mail = req.body.email;
    res.status(200).json({ message: "Email recibido."});
});

app.get("/enviarCodigo",(req, res) =>{ //esta funcion 
    const numRandom = getNumRandom();
    
    EnviarMail(mail, numRandom);
    res.send({code: numRandom});
    console.log(numRandom)
}); // "/" es localhost:1234 y req sirve para enviar y res para recibir

app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`);
});