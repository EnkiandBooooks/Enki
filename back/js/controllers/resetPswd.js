import { EnviarMailpswd } from "../utils/enviarpswd.js"; // Importa la función EnviarMail



export class resetPswdController {
    static async recibirMailPswd(req, res) { 

        const mailUsuarioPswd = req.body.email;       // Asigna el correo electrónico del cuerpo de la solicitud a la variable mailUsuario
        console.log(req.body)
        console.log("Hola")
        // EnviarMailpswd(mailUsuarioPswd);     // Envía el correo electrónico al usuario con el número aleatorio
        // console.log(mailUsuarioPswd)
        // res.status(200).json({ message: "Email recibido.",email_sendcode_token:token}); 
        res.status(200).json({ message: "Hola"})
        
    }
}
