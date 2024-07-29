import express from "express"; //importamos express
import { EnviarMail, random } from "./enviarmail.mjs"; //improtamos EnviarMail y Random

const app = express()
app.use(express.json())
const PORT = 1234 //creamos el puerto

app.post("/recibirmail", (req,res) =>{ //creamos la funcion para recibir el mail
    const {mail} = req.body
    console.log(mail)
    EnviarMail(mail)   
})

app.get("/",(req , res) =>{ //esta funcion 
    res.send(`${random}`)

} ) // "/" es localhost:1234 y req sirve para enviar y res para recibir


app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`)
})

