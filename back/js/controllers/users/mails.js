import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { sendMail } from "../../utils/enviarmail.js"; // Importa la función EnviarMail
import { getNumRandom } from "../../utils/random.js"; // Importa la función getNumRandom
import { getMailSchema, verifyCodeSchema } from '../../schema/mail.js';
import { AccessRefreshToken } from '../../utils/refreshAccessToken.js';

/**
 * Clase MailController para gestionar operaciones relacionadas con el manejo de correos electrónicos.
 * 
 * @class MailController
 */
export class MailController {
    /**
     * Valida la estructura del correo electrónico enviado, genera un código aleatorio, lo envía por correo electrónico 
     * y devuelve un token JWT que contiene el correo electrónico y el código de verificación.
     * 
     * @static
     * @async
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} req.body - Cuerpo de la solicitud que contiene el correo electrónico del usuario.
     * @param {string} req.body.email - Correo electrónico al que se enviará el código de verificación.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve un objeto JSON con un mensaje de éxito y el token JWT con el código de verificación.
     * 
     * @example
     * // Ejemplo de solicitud para enviar el correo
     * // POST
     * MailController.getMail(req, res);
     */
    static async getMail(req, res) { 

        const validation = await getMailSchema.safeParseAsync(req.body);       //Validamos el schema de zod con req.body
        if(!validation.success){ //Verifica que haya email y esté bien formado
            return res.status(400).json({ resultado: validation.error.errors[0].message });
        }
        const mailUser = req.body.email;
        const numRandom = getNumRandom();       // Genera un número aleatorio
        sendMail(mailUser, numRandom);     // Envía el correo electrónico al usuario con el número aleatorio

        const tokenData = {mail: mailUser, codigo: numRandom}
        const token = AccessRefreshToken.signToken(tokenData, process.env.secret_jwt_key, '1h');        // Genera un token JWT con el correo electrónico y una clave secreta, expira en 1 hora
        
        res.status(200).json({ message: "Email recibido.",email_sendcode_token:token}); // ejemplo cookie
    }
    /**
     * Verifica que el código de verificación proporcionado por el usuario sea correcto.
     * 
     * @static
     * @async
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} req.body - Cuerpo de la solicitud que contiene el token y el código de verificación.
     * @param {string} req.body.cookie - Token JWT que contiene el código de verificación y el correo electrónico.
     * @param {string} req.body.codigo - Código de verificación proporcionado por el usuario.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve un objeto JSON indicando si el código es correcto o incorrecto.
     * 
     * @example
     * // Ejemplo de solicitud para verificar el código
     * // POST
     * MailController.verifyCode(req, res);
     */
    static async verifyCode(req, res) {
        const token = req.body.cookie;
        const userCode = req.body.codigo;
        const validation = verifyCodeSchema.safeParse(req.body);       //Validamos el schema de zod con req.body
        if(!validation.success){ //Comprueba si la verificación es incorrecta
            console.log(validation.error.errors);
            return res.status(400).json({ resultado: validation.error.errors[0].message });
        }
        const correctCode = jwt.verify(token, process.env.secret_jwt_key).codigo;

        correctCode == userCode ? res.status(200).json({resultado: "Correcto"}) : res.status(200).json({resultado: "Incorrecto"});
    }
}
