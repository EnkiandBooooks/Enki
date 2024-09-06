import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { EnviarMail } from "../utils/enviarmail.js"; // Importa la función EnviarMail
import { getNumRandom } from "../utils/random.js"; // Importa la función getNumRandom

// Variable global para almacenar el correo del usuario
let mailUsuario = "";

/**
 * Clase mailController para gestionar operaciones relacionadas con el manejo de correos electrónicos.
 */
export class mailController {
    /**
     * Recibe el correo electrónico del usuario y genera un token JWT.
     *
     * @param {Object} req - Objeto de solicitud (Request) de Express.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     * @returns {Promise<void>} - Responde con un mensaje de confirmación y un token JWT.
     */
    static async recibirMail(req, res) { 
        // Asigna el correo electrónico del cuerpo de la solicitud a la variable mailUsuario
        mailUsuario = req.body.email;

        // Genera un token JWT con el correo electrónico y una clave secreta, expira en 1 hora
        const token = jwt.sign(
            { mail: mailUsuario }, 
            process.env.secret_jwt_key, {
            expiresIn: '1h'
            })
        
        res.status(200).json({ message: "Email recibido.",email_sendcode_token:token}); // ejemplo cookie
    }

    /**
     * Envía un correo electrónico con un código aleatorio al usuario.
     *
     * @param {Object} req - Objeto de solicitud (Request) de Express.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     * @returns {Promise<void>} - Responde con un código aleatorio enviado al correo.
     */
    static async enviarMail(req, res) { 
        // Genera un número aleatorio
        const numRandom = getNumRandom();
        
        // Envía el correo electrónico al usuario con el número aleatorio
        EnviarMail(mailUsuario, numRandom);

        // Envía la respuesta con el código aleatorio
        res.status(200).send({ code: numRandom });
    }
}
