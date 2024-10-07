import jwt from "jsonwebtoken";
import 'dotenv/config';
import { AccessRefreshToken } from "../../utils/refreshAccessToken.js";
import { ObjectId } from "mongodb";

/**
 * Clase RefreshController para gestionar la regeneración de tokens de acceso mediante el uso de tokens de actualización.
 * 
 * @class RefreshController
 */
export class RefreshController{
  /**
     * Regenera el accessToken utilizando el refreshToken proporcionado. Desencripta el refreshToken para extraer el ID del usuario,
     * y luego genera un nuevo accessToken.
     * 
     * @static
     * @async
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} req.body - Cuerpo de la solicitud que contiene el refreshToken.
     * @param {string} req.body.refreshToken - Token de actualización del usuario.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve un objeto JSON con el nuevo accessToken.
     * 
     * @example
     * // Ejemplo de solicitud para refrescar el token de acceso
     * // POST
     * RefreshController.refreshToken(req, res);
     */
    static async refreshToken(req, res){
        // Recogemos el refreshToken, lo desencriptamos y lo convertimos en clase ObjectId
        // TODO => Revisar el new ObjectId() y prueba de errores.
        const refreshToken = req.body.refreshToken;
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const id = new ObjectId(payload._id);
        const accessToken = await AccessRefreshToken.generateAccessToken(id);

        res.status(200).json({accessToken: accessToken})
    }
}