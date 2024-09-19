import { RegisterModel } from "../models/mongodb/register"

export class loginControler{
    static async loginUsuario(req, res){
        usr = req.body.usr
        pwd = req.body.pwd

        try{
            user = RegisterModel.buscarUsuario({userName : usr})
            
            if (pwd !== user.password){
                res.status(200).json({resultado: "Contraseña incorrecta"});
            }


        } catch(err) {
            res.status(200).json({resultado: "Usuario no existe"});
        }
    }
}