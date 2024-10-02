import { ProfileModel } from "../../database/mongodb/profile.js";


export class DataController{
    static async getData(req, res){
        console.log("Hola")
        const usr = req.user;
        console.log("----------------------")
        console.log(usr)
        const creationDate = await ProfileModel.getUserCreationDate({mail:usr.mail}); //Mirar query, quizá mejor a partir de la id de usuario?        
        console.log(creationDate)
        res.json({"user": usr.username, "mail": usr.mail, "rol": usr.rol, "creationDate":creationDate});
    }

}