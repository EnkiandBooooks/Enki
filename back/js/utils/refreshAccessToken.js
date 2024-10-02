import jwt from "jsonwebtoken";
import 'dotenv/config';
// import { RegisterModel } from "../database/mongodb/register.js";
import { userModel } from "../schema/users.js";
import { ObjectId } from "mongodb";

export class AccessRefreshToken{
    /**
     * Función para generar el AccessToken y el RefreshToken
     * @param {ObjectId} userId => La id del usuario que queremos crear los tokens.
     * @returns => Devuelve los 2 tokens.
     */
    static async generateAccessAndRefreshTokens(userId){
        try {
            const accessToken = await AccessRefreshToken.generateAccessToken(userId);
            const refreshToken = await AccessRefreshToken.generateRefreshToken(userId);

            return { accessToken, refreshToken }
        } catch (error) {
            return error
        }
    }
    /**
     * Función para generar el AccessToken.
     * @param {ObjectId} userId => La id del usuario que queremos crear los tokens.
     * @returns => Un token que guarda la id y el email del usuario.
     */
    static async generateAccessToken(userId){
        // const user = await RegisterModel.searchUser({"_id": userId});
        const user = await userModel.findById(userId);

        console.log("AccessToken regenerado.")
        return jwt.sign(
            { _id: user._id, email: user.mail },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5s' }
        )
    }
    /**
     * Función para generar el RefreshToken.
     * @param {ObjectId} userId => La id del usuario que queremos crear los tokens.
     * @returns => Un token que guarda la id del usuario.
     */
    static async generateRefreshToken(userId){
        // const user = await RegisterModel.searchUser({_id: userId});
        const user = await userModel.findById(userId);
        return jwt.sign(
            { _id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "15d"}
        )
    }
}