import { EnviarMailpswd } from "../../utils/enviarpswd.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config';
import { PasswdHashManager } from "../../utils/passwdhash.js";
import { passwordSchema } from "../../schema/resetPswd.js";
import { userModel } from "../../database/models/users.js";

/**
 * Clase resetPswdController para gestionar las operaciones de restablecimiento de contraseña de los usuarios.
 * 
 * @class resetPswdController
 */
export class resetPswdController {
    /**
     * Genera un token temporal para el restablecimiento de contraseña, envía un correo electrónico al usuario con un enlace para cambiar la contraseña.
     * 
     * @static
     * @async
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} req.body - Cuerpo de la solicitud que contiene el correo electrónico del usuario.
     * @param {string} req.body.email - Correo electrónico del usuario que solicita el restablecimiento.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve un objeto JSON con la URL temporal generada o un mensaje de error si el usuario no existe.
     * 
     * @example
     * // Ejemplo de solicitud para enviar el correo de restablecimiento de contraseña
     * // POST
     * resetPswdController.recibirMailPswd(req, res);
     */
    static async recibirMailPswd(req, res) { 

        const mailUsuarioPswd = req.body.email;
        
        const userPswd = await userModel.findOne({email : mailUsuarioPswd});
        if (!userPswd){
            return res.status(404).json({ message: 'Usuario no encontrado'});
        }
        const token = jwt.sign(
            { _id: userPswd._id }, 
            process.env.secret_jwt_key, {
            expiresIn: '15m'
        })  
        
        const temporaryUrl = `http://localhost:4200/resetPswd2/${token}`;

        EnviarMailpswd(mailUsuarioPswd, temporaryUrl);

        res.json({url: temporaryUrl});
    }

    /**
     * Verifica el token de restablecimiento y permite al usuario cambiar su contraseña si el token es válido.
     * 
     * @static
     * @async
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} req.body - Cuerpo de la solicitud que contiene la nueva contraseña.
     * @param {string} req.body.newPassword - Nueva contraseña proporcionada por el usuario.
     * @param {Object} req.params - Parámetros de la solicitud, incluyendo el token de restablecimiento.
     * @param {string} req.params.tokenPswd - Token temporal de restablecimiento de contraseña.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve un objeto JSON con un mensaje de éxito si la contraseña se actualiza correctamente o un error si ocurre un problema.
     * 
     * @example
     * // Ejemplo de solicitud para cambiar la contraseña
     * // POST
     * resetPswdController.newPassword(req, res);
     */
    static async newPassword(req, res) {
        const validationResult = passwordSchema.safeParse(req.body);

        if (!validationResult.success){
            return res.status(400).json({
                message: 'Datos invalidos', errors:validationResult.error.errors
            });
        }   
        const { newPassword } = validationResult.data;
        const token = req.params.tokenPswd;

        try{
            const idUserPswd = jwt.verify(token, process.env.secret_jwt_key)._id;

            const user = await userModel.findById(idUserPswd);

            if (!user){
                return res.status(404).json({ message: 'No se ha econtrado el usuario'});
            }

            const hashedPassword = await PasswdHashManager.hashPassword(newPassword);
        
            await userModel.findByIdAndUpdate(
                idUserPswd,
                {password: hashedPassword},
                {new: true}
            );
            
            return res.status(200).json({message: 'Contraseña actualizada'})
        }catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
}   
 

