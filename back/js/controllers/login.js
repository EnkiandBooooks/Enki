import { RegisterModel } from "../models/mongodb/register.js"
import bcrypt from 'bcrypt';

export class LoginController{
    static async loginUser(req, res){
        const usr = req.body.usr
        const pwd = req.body.pwd
        
        try{
            const user = await RegisterModel.searchUser({userName : usr})
            console.log(user)
            const isValid = await bcrypt.compare(pwd, user.password)
            console.log("Usuario loggeado.")
            return res.status(200).json({resultado: "Usuario Correcto"});
        } catch(err) {
            return res.status(200).json({resultado: "Usuario no existe"});
        }
    }
}