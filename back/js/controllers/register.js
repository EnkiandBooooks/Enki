import { RegisterModel } from "../models/mongodb/register.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class registerController {
    static async recibirUsrPwd (req, res){
        console.log(req.body)

        // TODO Verificación de que las variables estén bien.

        const nombreUsuario = req.body.userName;
        const contraseña = req.body.passWord;
        const token = req.body.cookie;
        const email = jwt.verify(token, process.env.secret_jwt_key).mail;

        try {
            const nuevoUsuario = {
                userName: nombreUsuario,
                mail: email,
                password: contraseña
            };
            
            console.log(nuevoUsuario);
            RegisterModel.insertarUsuario(nuevoUsuario);

            res.status(200).json({ message: "Datos recibidos correctamente"});
        }catch (error) {
            console.error("Error con la solicitud", error)
            res.status(500).json({ message: "Error del servidor" })
        }
    }
}
