import { loginSchema } from "../../schema/login.js";
import { PasswdHashManager } from "../../utils/passwdhash.js";
import { AccessRefreshToken } from "../../utils/refreshAccessToken.js";
import { userModel } from "../../database/models/users.js";
import axios from "axios";
import 'dotenv/config';


/**
 * Clase que gestiona las operaciones de login.
 * 
 * @class LoginController
 */
export class LoginController {
 /**
   * Recibe los datos de usuario y contraseña, valida los datos con Zod, comprueba que el usuario existe en la base de datos
   * y verifica si la contraseña es correcta. Si todo es válido, genera y envía tokens de acceso y de actualización.
   *
   * @static
   * @async
   * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los datos de usuario y contraseña.
   * @param {Object} req.body - Cuerpo de la solicitud con los datos de login.
   * @param {string} req.body.usr - Nombre de usuario proporcionado.
   * @param {string} req.body.pwd - Contraseña proporcionada.
   * @param {Object} res - Objeto de respuesta (Response) de Express.
   * @returns {Promise<void>} - Responde con un objeto JSON que contiene el resultado y, si es exitoso, los tokens de acceso.
   * 
   * @example
   * // Ejemplo de solicitud de login
   * // POST
   * LoginController.loginUser(req, res);
   */
  static async loginUser(req, res) {
    try {
      // Validación de datos de entrada con Zod
      const { usr, pwd } = loginSchema.parse(req.body);

      const recaptchaResponse = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        null, 
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          params: {
            secret: process.env.recaptcha_secret_key, 
            response: req.body.recaptcha,       
          },
        }
      );
      const recaptchaResult = recaptchaResponse.data
      // const recaptchaResult = { success: false, challenge_ts: '2024-12-09T11:23:24Z', hostname: 'localhost'}

      // Consulta a la base de datos para verificar si el usuario existe
      const user = await userModel.findOne({ username: usr });
      if (!user) {
        return res.status(200).json({ resultado: "Usuario no existe" });
      }

      // Verificación de la contraseña
      const isValid = await PasswdHashManager.compareHash(pwd, user.password);
      if (!isValid) {
        return res.status(200).json({ resultado: "Contraseña incorrecta." });
      }

      // Generar Access y Refresh Tokens
      const { accessToken, refreshToken } =
        await AccessRefreshToken.generateAccessAndRefreshTokens(user._id);

      // Respuesta exitosa con los tokens
      res.status(200).json({
        accessToken,
        refreshToken,
        resultado: "Usuario Correcto",
        recaptcha: recaptchaResult.success,
      });
    } catch (error) {
      // if (error instanceof z.ZodError) {
        // Si la validación falla, devolver un error con los detalles
        // return res.status(400).json({ resultado: error.errors[0].message });
      // }
      // Manejo de errores generales del servidor
      res
        .status(500)
        .json({ resultado: "Error del servidor", error: error.message });
    }
  }
}
