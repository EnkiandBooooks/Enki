import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { sendMail } from "../utils/enviarmail.js"; // Importa la función EnviarMail
import { getNumRandom } from "../utils/random.js"; // Importa la función getNumRandom
import { z } from "zod";
/**
 * Clase mailController para gestionar operaciones relacionadas con el manejo de correos electrónicos.
 */

const getMailSchema = z.object({email: z.string().min(1, "El email es obligatorio").email("El email no está bien formado")});
const verifyCodeSchema = z.object({
    cookie: z.string().min(1, "La cookie es obligatoria"),
    codigo: z.number().min(1,"El código es obligatorio")

});

export class MailController {
    static async getMail(req, res) { 

        const validation = getMailSchema.safeParse(req.body);       //Validamos el schema de zod con req.body
        if(!validation.success){ //Verifica que haya email y esté bien formado
            return res.status(400).json({ resultado: validation.error.errors[0].message });
        }
        const mailUser = req.body.email;
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
