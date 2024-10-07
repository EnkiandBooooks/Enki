import jwt from "jsonwebtoken";
import 'dotenv/config';
import { userModel } from "../schema/users.js";
import { ObjectId } from "mongodb";
// TODO: Todavía no esta en uso este middleware

/**
 * 
 * Función para comprobar si el AccessToken esta agotado o sigue activo.
 * 
 * @param {*} req Objeto de solicitud (Request) de Express, que contiene el header.
 * @param {*} res Objeto de respuesta (Response), con la que devolveremos al front.
 * @param {*} next Paramentro para continuar a la siguiente función de la ruta.
 */
export const verifyJWT = async (req, res, next) => {

    if(!req.header('Authorization')) {      // Si en la cabeza del request no hay un parametro Authorization...
        return res.status(401).json({ message: "You need the token in the header." });
    }

    // Recogemos el token de la cabecera.
    const token = req.header("Authorization");
    let decodedToken;

    try {  // Si el token es invalido o se ha caducado devuelve un mensaje avisandolo.
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        return res.status(401).json({ message: "Token invalid." });   
    }
    
    // Comprobamos que el usuario del que pertenece el AccessToken existe.
    const id = new ObjectId(decodedToken._id);
    const user = await userModel.findById(id);
    if(!user){ // Si no devolvemos un mensaje avisando.
        return res.status(403).json({ message: "User not found" });
    }
    console.log("Hola")
    // SI todo va bien guardamos en el req al usuario y continuamos avanzando.
    req.user = user;
    next();
}