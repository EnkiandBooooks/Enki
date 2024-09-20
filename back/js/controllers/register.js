import { RegisterModel } from "../models/mongodb/register.js";
import { PasswdHashManager } from "../utils/passwdhash.js";
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import 'dotenv/config';

/**
 * Esquema de validación usando zod
 */
const userSchema = z.object({
    username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
    password: z.string().min(8, { message: "La contraseña debe contener al menos 8 caracteres" }),
    cookie: z.string().min(1, { message: "La cookie es requerida" })
});

/**
 * Clase registerController para gestionar las operaciones de registro de usuarios.
 */
export class RegisterController {
    /**
     * Recibe los datos de usuario y contraseña, procesa el registro de usuario en la base de datos.
     *
     * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los datos de usuario y contraseña.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     * @returns {Promise<void>} - Responde con un mensaje de éxito o un error del servidor.
     */
    static async getUsrPwd(req, res) {

        // Validar los datos de la solicitud usando zod
        const validation = userSchema.safeParse(req.body);

        if (!validation.success) {
            // Responde con un error si la validación fallaç
            console.log(validation.error.errors.map(err => err.message).join(', '));
            return res.status(400).json({
                message: validation.error.errors.map(err => err.message).join(', ')
            });
        }

        const { username, passwordUser, cookie } = req.body;
        console.log(req.body);
        try {
            // Hashea la contraseña utilizando el gestor de hash de contraseñas
            console.log(passwordUser)
            
            const password = await PasswdHashManager.hashPassword(passwordUser);
            console.log("HASEADA: ", req.body);
            // Extrae el email del token JWT en la cookie
            const email = jwt.verify(cookie, process.env.secret_jwt_key).mail;

            // Comprueba que el email no esté vacío
            if (!email) {
                return res.status(400).json({
                    message: "El token no contiene un correo electrónico válido."
                });
            }

            // Crea un nuevo objeto usuario con el nombre de usuario, correo electrónico y contraseña hasheada
            const newUser = {
                username: username,
                mail: email,
                password: password
            };

            console.log(newUser);

            // Inserta el nuevo usuario en la base de datos
            await RegisterModel.insertUser(newUser);

            // Envía una respuesta de éxito
            res.status(200).json({ message: "Datos recibidos correctamente" });
        } catch (error) {
            // Manejo de errores: imprime un mensaje de error y responde con un error del servidor
            console.error("Error con la solicitud", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    }
}
