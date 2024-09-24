import { RegisterModel } from "../models/mongodb/register.js"
import { PasswdHashManager } from "../utils/passwdhash.js";
import { AccessRefreshToken } from "../utils/refreshAccessToken.js";
/**
 * Clase que gestiona las operaciones de login.
 */
export class LoginController{
    /**
     * Recibe los datos de usuario y contraseña, comprueba que el usuario existe en la base de datos y comprueba
     * si la contraseña es la misma.
     *
     * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los datos de usuario y contraseña.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     * @returns {Promise<void>} - Responde con un mensaje de éxito o un error del servidor.
     */
    static async loginUser(req, res){
        const usr = req.body.usr;
        const pwd = req.body.pwd;
        const user = await RegisterModel.searchUser({username : usr});      // Hacemos una consulta del usuario.
        console.log(user)
        if(user === null){          //Si no existe devolvemosn un 404.
            res.status(404).json({"resultado": "Usuario no existe"});
        }

        const isValid = PasswdHashManager.compareHash(pwd, user.password);      // Comprobamos si la contraseña es la misma.
        // Depende de si es la misma contraseña envia un mensaje de error o de confirmación.
        if(!isValid){
            res.status(400).json({resultado: "Contraseña incorrecta."});
        }

        // Creamos el Access y Refresh Token.
        const { accessToken, refreshToken } = await AccessRefreshToken.generateAccessAndRefreshTokens(user._id);
        console.log(accessToken)
        res
          .status(200)
          .json({
            accessToken,
            refreshToken,
            resultado: "Usuario Correcto"
        })
    }
}