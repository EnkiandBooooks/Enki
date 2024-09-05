import { RegisterModel } from "../models/mongodb/register.js";

export class registerController {
    static async recibirUsrPwd (req, res){
        console.log(req.body)

        // TODO Verificación de que las variables estén bien.

        const nombreUsuario = req.body.userName;
        const contraseña = req.body.password;
        const email = req.body.mail;

        const nuevoUsuario = {
            userName: nombreUsuario,
            mail: email,
            password: contraseña
        };
        
        console.log(nuevoUsuario)
        RegisterModel.insertarUsuario(nuevoUsuario);

        res.status(200).json({ message: "Datos recibidos"});
    }
}