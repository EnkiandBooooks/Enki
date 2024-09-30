import { EnviarMailpswd } from "../../utils/enviarpswd.js"; // Importa la función EnviarMail
import { RegisterModel } from "../../database/mongodb/register.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config';
import { PasswdHashManager } from "../../utils/passwdhash.js";
import { ObjectId } from "mongodb";
import { passwordSchema } from "../../schema/resetPswd.js";


export class resetPswdController {
    static async recibirMailPswd(req, res) { 

        const mailUsuarioPswd = req.body.email;
        const userPswd = await RegisterModel.searchUser({mail: mailUsuarioPswd});
        
        if (!userPswd){
            return res.status(404).json({ message: 'Usuario no encontrado'});
        }
        console.log(userPswd);

        
        const tokenPswd = jwt.sign({       
            _id: userPswd._id,
            }, 
            process.env.secret_jwt_key, {
            expiresIn: '15m'
            });
        
        const temporaryUrl = `http://localhost:4200/resetPswd3/${tokenPswd}`;
        EnviarMailpswd(mailUsuarioPswd, temporaryUrl);
        // console.log(tokenPswd); 
        console.log(temporaryUrl);
        res.send({url: temporaryUrl});
        
    }
    static async newPassword(req, res) {
        const validationResult = passwordSchema.safeParse(req.body);

        if (!validationResult.success){
            return res.status(400).json({
                message: 'Datos invalidos', errors:validationResult.error.errors
            });
        }   
        const { newPassword } = validationResult.data;
        const token = req.params.tokenPswd;

        // console.log('Token recibido:', token);  
        // console.log('Nueva contraseña recibida:', newPassword); 


        try{
            const idUserPswd = jwt.verify(token, process.env.secret_jwt_key)._id;
            const user = await RegisterModel.searchUser(new ObjectId(idUserPswd));

            if (!user){
                return res.status(404).json({ message: 'No se ha econtrado el usuario'});
            }
            const hashedPassword = await PasswdHashManager.hashPassword(newPassword);
            await RegisterModel.updateUser(
                { _id: new ObjectId(idUserPswd)},
                { password: hashedPassword}
            );
            return res.status(200).json({message: 'Contraseña actualizada'})
        }catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
}   
 

