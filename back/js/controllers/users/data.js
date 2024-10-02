import { ProfileModel } from "../../database/mongodb/profile.js";
import { RegisterModel } from "../../database/mongodb/register.js"; // Asegúrate de que RegisterModel esté importado
import multer from 'multer'; // Cambia a import

const upload = multer({ dest: 'uploads/' }); // Establece la carpeta de destino para los archivos subidos
//No se usa, Para un futuro

export class DataController {
    static async getData(req, res) {
        try {
            const usr = req.user;
            console.log("----------------------");
            console.log(usr);

            // Obtener la fecha de creación del usuario usando el correo electrónico
            const creationDate = await ProfileModel.getUserCreationDate({ mail: usr.mail });
            console.log(creationDate);

            res.json({
                user: usr.username,
                mail: usr.mail,
                rol: usr.rol,
                creationDate: creationDate,
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: "Error fetching user data" });
        }
    }

    static async modifyUser(req, res) {
        try {
            const img = req.file ? `../../img/${req.file.filename}` : null;
            const username = req.body.user;
            const mail = req.body.mail;

            console.log(img, username, mail);

            // Actualizar la información del usuario
            const updateData = {
                username: username,
                mail: mail,
                img: img, // Guarda la URL de la imagen si es necesario
            };

            // Actualizar el usuario en la base de datos
            const updatedUser = await RegisterModel.findOneAndUpdate(
                { username: username }, // Criterio de búsqueda
                updateData,            // Datos a actualizar
                { new: true }          // Devolver el documento actualizado
            );

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
