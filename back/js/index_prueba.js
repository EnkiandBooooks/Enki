import { EnviarMail } from "./enviarmail.mjs";
const express = require("express"); 

const app = express()
app.use(express.json())
const PORT = 1234 //creamos el puerto

app.post("/recibirmail", (req,res) =>{
    const {mail} = req.body
    console.log(mail)
    EnviarMail(mail)   
})

app.get("/",(req , res) =>{
    res.send(`${EnviarMail.random}`)

} ) // "/" es localhost:1234 y req sirve para enviar y res para recibir


app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`)
})

