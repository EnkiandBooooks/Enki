import { RegisterModel } from "../../database/mongodb/register.js";
import { PasswdHashManager } from "../../utils/passwdhash.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ObjectId } from "mongodb";
import { userSchema } from "../../schema/users.js";


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
            
            // Crea un nuevo objeto usuario con el nombre de usuario, correo electrónico y contraseña hasheada
            const newUser = {
                username: username,
                mail: email,
                password: password,
                rol: "usuario",
                theme: {
                    themeName: 'default'
                },
                icon: {
                    iconName: 'default'
                },
                workSpacesCreated: [],
                guestWorkSpaces: []
            };
            
            const newWorkSpace = { //Los workspaces van anidadoas en usuarios en el array de workSpacesCreated y solo se añadiran en caso de ser necesario
                idWorkSpace: new ObjectId(),
                workSpaceName: "Nombre del workspace",
                bookId: null,
                members: [
                    {
                        memberId: new ObjectId(),
                        name: "Miembro 1",
                        progress: {
                            percentage: 0
                        }
                    }
                ],
                timeline: [
                    {
                        date: new Date(),
                        event: "Creación del workspace",
                        comment: [
                            {
                                commentId: new ObjectId(),
                                text: "Comentario inicial",
                                user: {
                                    commentUserId: null,
                                    userName: "Nombre del usuario"
                                },
                                date: new Date()
                            }
                        ]
                    }
                ]
            };

            const newGuestWorkSpace = { //Los guest workspace se anidan en newUser.guestWorkSpaces
                guestWorkSpaceId: "null", // El ID del workspace como invitado
                guestWorkSpaceName: "workSpaceName" // Nombre del workspace donde fue invitado
            };

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