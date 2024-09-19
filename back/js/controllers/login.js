import { RegisterModel } from "../models/mongodb/register.js";
import bcrypt from "bcrypt"

export class loginControler{
    static async login(req, res){
        const usuario = req.body.usr;
        const pswd = req.body.pwd;
        const mail = req.body.mail;

        const usr = await RegisterModel.buscarUsuario({ "userName": usuario });

        if(usr === null){
            res.status(200).json({ message: "El usuario no existe." });
        }

        const isValid = bcrypt.compareSync(pswd, usr.password)
        if(isValid){
            res.status(200).json({ message: "El usuario existe." });
        }else{
            res.status(200).json({ message: "La contraseña no es correcta." });
        }
    }
}