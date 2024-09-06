import { RegisterModel } from "../models/mongodb/register.js";
import { PasswdHashManager } from "../utils/passwdhash.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

        // TODO: Verificación de que las variables estén bien.

        // Extrae el nombre de usuario del cuerpo de la solicitud
        const nombreUsuario = req.body.userName;
        const contraseña = await PasswdHashManager.hashPassword(req.body.passWord);

        // Extrae el token de la cookie y verifica el correo electrónico contenido en el token JWT
        const token = req.body.cookie;
        const email = jwt.verify(token, process.env.secret_jwt_key).mail;

        try {
            // Crea un nuevo objeto usuario con el nombre de usuario, correo electrónico y contraseña hasheada
            const nuevoUsuario = {
                userName: nombreUsuario,
                mail: email,
                password: contraseña
            };

            console.log(nuevoUsuario);

            // Inserta el nuevo usuario en la base de datos
            RegisterModel.insertarUsuario(nuevoUsuario);

            // Envía una respuesta de éxito
            res.status(200).json({ message: "Datos recibidos correctamente" });
        } catch (error) {
            // Manejo de errores: imprime un mensaje de error y responde con un error del servidor
            console.error("Error con la solicitud", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    }
}
