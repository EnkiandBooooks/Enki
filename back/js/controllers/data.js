import { RegisterModel } from "../models/mongodb/register.js";

export class DataController{
    static async getData(req, res){
        console.log("Hola")
        const usr = req.user;
        console.log("----------------------")
        console.log(usr)
        // const user = await RegisterModel.searchUser({username: usr});      // Hacemos una consulta del usuario.
        
        res.json({"User": usr.username, "mail": usr.mail});
    }

}