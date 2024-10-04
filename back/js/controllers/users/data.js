import { updateUserSchema, userModel } from  "../../schema/users.js"// Asegúrate de que RegisterModel esté importado
import { cuttImgProfile } from "../profile/cuttImg.js";
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
                img: usr.img || null,  // Agregar la imagen si existe
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: "Error fetching user data" });
        }
    }

    static async modifyUser(req, res) {
        try {
            /*const validation = await updateUserSchema.safeParseAsync(req.body);
            if(!validation.success){ //Verifica que haya email y esté bien formado
                return res.status(400).json({ resultado: validation.error.errors[0].message });
            }*/

            const img = req.file ? `../../img/${req.file.filename}` : null;
            const username = req.body.username;
            const email = req.body.mail;
            //const filename = req.file.filename;
            //console.log(filename)
            //console.log( "ID: ",req.user._id);
            //cuttImgProfile(img, filename)

            // Actualizar la información del usuario
            const updateData = {
                _id: req.user._id,
                username: username,
                email: email,
                img: img, // Guarda la URL de la imagen si es necesario
            };

            if (img) {
                updateData.img = img;  // Agregar la URL de la imagen si se subió
            }

            // Actualizar el usuario en la base de datos
            const updatedUser = await userModel.findOneAndUpdate(
                { _id: req.user._id },  // Condición de búsqueda
                updateData,             // Datos a actualizar
                { new: true }           // Devolver el usuario actualizado
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