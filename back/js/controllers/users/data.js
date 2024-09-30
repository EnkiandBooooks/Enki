
export class DataController{
    static async getData(req, res){
        console.log("Hola")
        const usr = req.user;
        console.log("----------------------")
        console.log(usr)
                
        res.json({"user": usr.username, "mail": usr.mail, "rol": usr.rol});
    }

}