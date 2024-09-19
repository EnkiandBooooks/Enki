import { RegisterModel } from "../models/mongodb/register.js"
import bcrypt from 'bcrypt';

export class loginControler{
    static async loginUsuario(req, res){
        usr = req.body.usr
        pwd = req.body.pwd

        try{
            user = RegisterModel.buscarUsuario({userName : usr})
            console.log(user)
            const isValid = await bcrypt.compare(pwd, user.password)
            console.log("Usuario loggeado.")
            res.status(200).json({resultado: "Usuario Correcto"});
        } catch(err) {
            res.status(200).json({resultado: "Usuario no existe"});
        }
    }
}