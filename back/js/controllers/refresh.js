import jwt from "jsonwebtoken";
import 'dotenv/config';
import { AccessRefreshToken } from "../utils/refreshAccessToken.js";
import { ObjectId } from "mongodb";

export class RefreshController{
    /**
     * Esta función regenera el accessToken pasando el refreshToken. 
     */
    static async refreshToken(req, res){
        // Recogemos el refreshToken, lo desencriptamos y lo convertimos en clase ObjectId
        // TODO => Revisar el new ObjectId() y prueba de errores.
        const refreshToken = req.body.refreshToken;
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const id = new ObjectId(payload._id);
        const accessToken = await AccessRefreshToken.generateAccessToken(id);

        res.status(200).json({accessToken: accessToken})


        // const token = req.header("Authorization");
        // const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        // const id = new ObjectId(decodedToken._id);

        // // Regeneramos el AccessToken y lo enviamos.
        // const accessToken = await AccessRefreshToken.generateAccessToken(id);
        // res.status(200).json({
        //     message: "AccessToken generated.",
        //     accessToken
        // })
    }
}