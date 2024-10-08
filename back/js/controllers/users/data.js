import { updateUserSchema, userModel } from  "../../schema/users.js"// Asegúrate de que RegisterModel esté importado
import { cuttImgProfile } from "../profile/cuttImg.js";
import { deleteFolder } from "../../img/delete.js";
/**
 * Controlador para gestionar operaciones relacionadas con los datos de usuario.
 * 
 * @class DataController
 */
// import { deleteFolder } from "../../img/delete.js";
export class DataController {
    /**
     * Obtiene y devuelve los datos del usuario actual.
     * 
     * @static
     * @async
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} req.user - Objeto del usuario autenticado.
     * @param {string} req.user.username - Nombre de usuario.
     * @param {string} req.user.email - Correo electrónico del usuario.
     * @param {string} req.user.rol - Rol del usuario.
     * @param {Date} req.user.createdAt - Fecha de creación del usuario.
     * @param {string} req.user.img - URL de la imagen de perfil del usuario.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} Devuelve un objeto JSON con los datos del usuario.
     * 
     * @example
     * // Ejemplo de solicitud
     * // GET
     * DataController.getData(req, res);
     */
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

    /**
     * Modifica los datos del usuario y actualiza su imagen de perfil si se proporciona una nueva.
     * 
     * @static
     * @async
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} req.body - Datos enviados en la solicitud para actualizar el usuario.
     * @param {string} req.body.username - Nuevo nombre de usuario.
     * @param {string} req.body.mail - Nuevo correo electrónico del usuario.
     * @param {Object} req.file - Objeto que contiene el archivo de imagen cargado.
     * @param {string} req.file.filename - Nombre del archivo de la imagen cargada.
     * @param {string} req.user._id - ID del usuario autenticado.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} Devuelve un objeto JSON con el mensaje de éxito o error.
     * 
     * @example
     * // Ejemplo de solicitud
     * // PUT
     * DataController.modifyUser(req, res);
     */
    static async modifyUser(req, res) {
        try {
            /*const validation = await updateUserSchema.safeParseAsync(req.body);
            if(!validation.success){ //Verifica que haya email y esté bien formado
                return res.status(400).json({ resultado: validation.error.errors[0].message });
            }*/
            console.log("Aca esta:"+req.file.filename);
            const img = req.file ? `${req.file.filename}` : null;
            const username = req.body.username;
            const email = req.body.mail;
            const filename = req.filename;
            
            console.log( "ID: ",req.user._id);
            cuttImgProfile(img, filename);
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
            deleteFolder('../img/img_profile')
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