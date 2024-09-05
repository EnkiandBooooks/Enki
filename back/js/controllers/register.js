import { RegisterModel } from "../models/mongodb/register.js";

export class registerController {
    static async recibirUsrPwd (req, res){
        try {
            console.log(req.body)
            // TODO Verificación de que las variables estén bien.
            const nombreUsuario = req.body.userName;
            const contraseña = req.body.passWord;
            const email = req.body.mail;
            
            if (!nombreUsuario || !contraseña || !email){
                return res.status(400).json({
                    message: "Se deben llenar todos los campos."
                })
            }

            if (contraseña.length >= 8){
                return res.status(400).json({
                    message: "La contraseña debe conetener al menos 8 caracteres."
                });
            }

            const nuevoUsuario = {
                userName: nombreUsuario,
                mail: email,
                password: contraseña
            };
            
            console.log(nuevoUsuario)
            RegisterModel.insertarUsuario(nuevoUsuario);

            res.status(200).json({ message: "Datos recibidos correctamente"});
        }catch (error) {
            console.error("Error con la solicitud", error)
            res.status(500).json({ message: "Error del servidor" })
        }
    }
}
