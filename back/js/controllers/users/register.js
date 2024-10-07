import { PasswdHashManager } from "../../utils/passwdhash.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { userSchema, userModel } from "../../schema/users.js";
import { hash } from "bcrypt";

/**
 * Clase RegisterController para gestionar las operaciones de registro de usuarios.
 * 
 * @class RegisterController
 */
export class RegisterController {
   /**
     * Procesa el registro de un nuevo usuario, validando los datos de entrada, 
     * hasheando la contraseña y guardando la información del usuario en la base de datos.
     *
     * @static
     * @async
     * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los datos de usuario y contraseña.
     * @param {Object} req.body - Cuerpo de la solicitud con los datos del usuario.
     * @param {string} req.body.username - Nombre de usuario.
     * @param {string} req.body.passwordUser - Contraseña sin hashear.
     * @param {string} req.body.cookie - Token JWT que contiene el correo electrónico del usuario.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     * @returns {Promise<void>} - Responde con un mensaje de éxito si el registro es exitoso, o un error del servidor.
     * 
     * @example
     * // Ejemplo de solicitud para registrar un nuevo usuario
     * // POST /api/register
     * RegisterController.getUsrPwd(req, res);
     */
    static async getUsrPwd(req, res) {

        // Validar los datos de la solicitud usando zod
        const validation = userSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.errors.map(err => err.message).join(', ')
            });
        }

        const { username, passwordUser, cookie } = req.body;
        try {
            // Hashea la contraseña utilizando el gestor de hash de contraseñas
            const password = await PasswdHashManager.hashPassword(passwordUser);
            
            // Extrae el email del token JWT en la cookie
            const email = jwt.verify(cookie, process.env.secret_jwt_key).mail;
            
            // Comprueba que el email no esté vacío
            if (!email) {
                return res.status(400).json({
                    message: "El token no contiene un correo electrónico válido."
                });
            }
            //Usamos el Schema creado con mongoose que es el userModel (schema > users.js)
            const newUser = new userModel({
                username,
                email,
                password
            });
            //Inserta en la base de datos usando mongoose
            await newUser.save();
            // Envía una respuesta de éxito
            res.status(200).json({ message: "Datos recibidos correctamente" });
        } catch (error) {
            // Manejo de errores: imprime un mensaje de error y responde con un error del servidor
            console.error("Error con la solicitud", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    }
}
