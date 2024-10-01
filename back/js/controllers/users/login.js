// import { RegisterModel } from "../../database/mongodb/register.js";
import { loginSchema } from "../../schema/login.js";
import { PasswdHashManager } from "../../utils/passwdhash.js";
import { AccessRefreshToken } from "../../utils/refreshAccessToken.js";
import { usuario } from "../../schema/users.js";


/**
 * Clase que gestiona las operaciones de login.
 */
export class LoginController {
  /**
   * Recibe los datos de usuario y contraseña, valida con Zod, comprueba que el usuario existe en la base de datos
   * y verifica si la contraseña es correcta.
   *
   * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los datos de usuario y contraseña.
   * @param {Object} res - Objeto de respuesta (Response) de Express.
   * @returns {Promise<void>} - Responde con un mensaje de éxito o un error del servidor.
   */
  static async loginUser(req, res) {
    console.log("hola doy error")
    try {
      // Validación de datos de entrada con Zod
      const { usr, pwd } = loginSchema.parse(req.body);

      // Consulta a la base de datos para verificar si el usuario existe
      // const user = await RegisterModel.searchUser({ username: usr });
      const user = await usuario.findOne({ username: usr });
      if (!user) {
        return res.status(404).json({ resultado: "Usuario no existe" });
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
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Si la validación falla, devolver un error con los detalles
        return res.status(400).json({ resultado: error.errors[0].message });
      }
      // Manejo de errores generales del servidor
      res
        .status(500)
        .json({ resultado: "Error del servidor", error: error.message });
    }
  }
}
