import jwt from "jsonwebtoken";
import 'dotenv/config';
import { RegisterModel } from "../models/mongodb/register";
// TODO: Todavía no esta en uso este middleware

/**
 * 
 * Función para comprobar si el AccessToken esta agotado o sigue activo.
 * 
 * @param {*} req Objeto de solicitud (Request) de Express, que contiene el header.
 * @param {*} res Objeto de respuesta (Response), con la que devolveremos al front.
 * @param {*} next Paramentro para continuar a la siguiente función de la ruta.
 * @returns 
 */
export const verifyJWT = async (req, res, next) => {
    const token = req.header("Authorization");
    let decodedToken;

    try {  // Si el token es invalido o se ha caducado devuelve un mensaje avisandolo.
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        return res.status(401).json({ message: "Token invalid." });   
    }
    
    // Comprobamos que el usuario del que pertenece el AccessToken existe.
    const user = await RegisterModel.searchUser({_id: _id});
    if(!user){ // Si no devolvemos un mensaje avisando.
        return res.status(404).json({ message: "User not found" });
    }

    // SI todo va bien guardamos en el req al usuario y contuinuamos avanzando.
    req.user = user;
    next();
}