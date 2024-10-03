import { userModel } from  "../../schema/users.js"// Asegúrate de que RegisterModel esté importado
import multer from 'multer'; // Cambia a import

const upload = multer({ dest: 'uploads/' }); // Establece la carpeta de destino para los archivos subidos
//No se usa, Para un futuro

export class DataController {
    static async getData(req, res) {
        try {
            const usr = req.user;
            console.log("----------------------");

            // Obtener la fecha de creación del usuario usando el correo electrónico
            res.json({
                user: usr.username,
                mail: usr.email,
                rol: usr.rol,
                creationDate: usr.createdAt,
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: "Error fetching user data" });
        }
    }

    static async modifyUser(req, res) {
        try {
            //const img = req.file ? `../../img/${req.file.filename}` : null;
            const username = req.body.username;
            const email = req.body.mail;
            console.log( "ID: ",req.user._id);

            // Actualizar la información del usuario
            const updateData = {
                _id: req.user._id,
                username: username,
                email: email,
               // img: img, // Guarda la URL de la imagen si es necesario
            };

            // Actualizar el usuario en la base de datos
            const updatedUser = await userModel.findOneAndUpdate(updateData);

            if (!updatedUser) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            res.status(200).json({
                message: "Usuario actualizado exitosamente",
                user: updatedUser,
            });
        } catch (error) {
            console.error("Error updating user data:", error);
            res.status(500).json({ message: "Error updating user data" });
        }
    }
}