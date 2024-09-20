import { RegisterModel } from "../models/mongodb/register.js";
import { PasswdHashManager } from "../utils/passwdhash.js";
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import 'dotenv/config';

/**
 * Esquema de validación usando zod
 */
const userSchema = z.object({
    userName: z.string().min(1, { message: "El nombre de usuario es requerido" }),
    passWord: z.string().min(8, { message: "La contraseña debe contener al menos 8 caracteres" }),
    cookie: z.string().min(1, { message: "La cookie es requerida" })
});

/**
 * Clase registerController para gestionar las operaciones de registro de usuarios.
 */
export class registerController {
    /**
     * Recibe los datos de usuario y contraseña, procesa el registro de usuario en la base de datos.
     *
     * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los datos de usuario y contraseña.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     * @returns {Promise<void>} - Responde con un mensaje de éxito o un error del servidor.
     */
    static async recibirUsrPwd(req, res) {
        console.log(req.body);

        // Validar los datos de la solicitud usando zod
        const validation = userSchema.safeParse(req.body);

        if (!validation.success) {
            // Responde con un error si la validación falla
            return res.status(400).json({
                message: validation.error.errors.map(err => err.message).join(', ')
            });
        }

        const { userName, passWord, cookie } = req.body;

        try {
            // Hashea la contraseña utilizando el gestor de hash de contraseñas
            const contraseña = await PasswdHashManager.hashPassword(passWord);

            // Extrae el email del token JWT en la cookie
            const email = jwt.verify(cookie, process.env.secret_jwt_key).mail;

            // Comprueba que el email no esté vacío
            if (!email) {
                return res.status(400).json({
                    message: "El token no contiene un correo electrónico válido."
                });
            }

            // Crea un nuevo objeto usuario con el nombre de usuario, correo electrónico y contraseña hasheada
            const nuevoUsuario = {
                userName,
                mail: email,
                password: contraseña
            };

            console.log(nuevoUsuario);

            // Inserta el nuevo usuario en la base de datos
            await RegisterModel.insertarUsuario(nuevoUsuario);

            // Envía una respuesta de éxito
            res.status(200).json({ message: "Datos recibidos correctamente" });
        } catch (error) {
            // Manejo de errores: imprime un mensaje de error y responde con un error del servidor
            console.error("Error con la solicitud", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    }
}
