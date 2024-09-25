import { EnviarMailpswd } from "../utils/enviarpswd.js"; // Importa la función EnviarMail
import { RegisterModel } from "../models/mongodb/register.js";
import { sendMail } from "../utils/enviarmail.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config';



export class resetPswdController {
    static async recibirMailPswd(req, res) { 

        const mailUsuarioPswd = req.body.email;
        const userPswd = await RegisterModel.searchUser({mail: mailUsuarioPswd});
        
        console.log(userPswd);

        
        const tokenPswd = jwt.sign({       
            _id: userPswd._id,
            }, 
            process.env.secret_jwt_key, {
            expiresIn: '1h'
            })
        const temporaryUrl = `http://localhost:4200/resetPwsd2/${tokenPswd}`;
        EnviarMailpswd(mailUsuarioPswd, temporaryUrl)
        console.log(tokenPswd);
        console.log(temporaryUrl)
        res.send({url: temporaryUrl});
        
    }
    static async tokenPswd(req, res) {
        const tokenPswd = req.body.tokenPswd;
         }
}   
 

