import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { EnviarMail } from "../utils/enviarmail.js"; //improtamos EnviarMail y Random
import { getNumRandom } from "../utils/random.js";

let mailUsuario = ""

export class mailController {
    static async recibirMail (req, res){ //creamos la funcion para recibir el mail
        mailUsuario = req.body.email;

        const token = jwt.sign(
            {mail: mailUsuario}, 
            process.env.secret_jwt_key, {
            expiresIn: '1h'
            })
        
        res.status(200).json({ message: "Email recibido.",email_sendcode_token:token}); // ejemplo cookie
    }

    static async enviarMail (req, res) { //esta funcion 
        const numRandom = getNumRandom();
        
        EnviarMail(mailUsuario, numRandom);
        res.status(200).send({code: numRandom});
    }
}