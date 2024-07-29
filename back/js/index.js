import express from "express"; //importamos express
import cors from "cors";
import { EnviarMail, random } from "./enviarmail.js"; //improtamos EnviarMail y Random

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 1234 //creamos el puerto

app.post("/recibirmail", (req,res) =>{ //creamos la funcion para recibir el mail
    const mail = req.body.email;
    console.log(mail);
    EnviarMail(mail);
    res.send({code: random}) 
})

app.get("/enviarCodigo",(req , res) =>{ //esta funcion 
    res.send(`${random}`)

} ) // "/" es localhost:1234 y req sirve para enviar y res para recibir


app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`)
})
