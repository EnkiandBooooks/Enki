import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { sendMail } from "../utils/enviarmail.js"; // Importa la función EnviarMail
import { getNumRandom } from "../utils/random.js"; // Importa la función getNumRandom
/**
 * Clase mailController para gestionar operaciones relacionadas con el manejo de correos electrónicos.
 */
export class MailController {
    static async getMail(req, res) { 

        const mailUser = req.body.email;       // Asigna el correo electrónico del cuerpo de la solicitud a la variable mailUsuario
        const numRandom = getNumRandom();       // Genera un número aleatorio
        sendMail(mailUser, numRandom);     // Envía el correo electrónico al usuario con el número aleatorio

        const token = jwt.sign({         // Genera un token JWT con el correo electrónico y una clave secreta, expira en 1 hora
            mail: mailUser,
            codigo: numRandom
            }, 
            process.env.secret_jwt_key, {
            expiresIn: '1h'
            })
        
        res.status(200).json({ message: "Email recibido.",email_sendcode_token:token}); // ejemplo cookie
    }

    static async verificarCodigo(req, res) {
        const token = req.body.cookie;
        const userCode = req.body.codigo;
        const correctCode = jwt.verify(token, process.env.secret_jwt_key).codigo;

        correctCode == userCode ? res.status(200).json({resultado: "Correcto"}) : res.status(200).json({resultado: "Incorrecto"});
    }
}
