import { RegisterModel } from "../models/mongodb/register.js";
import { PasswdHashManager } from "../utils/passwdhash.js";

export class registerController {
    static async recibirUsrPwd (req, res){
        console.log(req.body)

        // TODO Verificación de que las variables estén bien.

        const nombreUsuario = req.body.userName;
         
        const contraseña = await PasswdHashManager.hashPassword(req.body.pass);
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