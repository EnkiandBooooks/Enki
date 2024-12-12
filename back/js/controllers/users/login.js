import { loginSchema } from "../../schema/login.js";
import { PasswdHashManager } from "../../utils/passwdhash.js";
import { AccessRefreshToken } from "../../utils/refreshAccessToken.js";
import { userModel } from "../../database/models/users.js";


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

      // Consulta a la base de datos para verificar si el usuario existe
      const user = await userModel.findOne({ username: usr });
      if (!user) {
        return res.status(404).json({ success: false, message: "Usuario no encontrado" });
      }

      // Verificación de la contraseña
      const isValid = await PasswdHashManager.compareHash(pwd, user.password);
      if (!isValid) {
        return res.status(401).json({ success: false, message: "Contraseña incorrecta." });
      }

      // Generar Access y Refresh Tokens
      const { accessToken, refreshToken } =
        await AccessRefreshToken.generateAccessAndRefreshTokens(user._id);

      // Respuesta exitosa con los tokens
      res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
        resultado: "Usuario Correcto",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Si la validación falla, devolver un error con los detalles
        return res.status(400).json({ success: false, message: "Datos invalidos", details: error.errors  });
      // }
      // Manejo de errores generales del servidor
      res
        .status(500)
        .json({ resultado: "Error del servidor", error: error.message });
    }
  }
}}
