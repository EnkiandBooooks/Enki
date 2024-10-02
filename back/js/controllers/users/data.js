
export class DataController{
    static async getData(req, res){
        console.log("Hola")
        const usr = req.user;
        console.log("----------------------")
        console.log(usr)
                
        res.json({"user": usr.username, "mail": usr.mail, "rol": usr.rol});
    }

    static async modifyUser(req, res){
        const img = req.file ? `../../img/${req.file.filename}` : null;
        const username= req.body.user;
        const mail= req.body.mail;
        console.log(img,username,mail)
        const result=RegisterModel.updateUser()
        res.status(200).json({'message': "Datos recibidos"})


        const update = { 
            username: username, 
            mail: mail,
            img: img  // Si deseas guardar la imagen o su URL
        };
    // Actualizamos el usuario en la base de datos
        const updatedUser = await RegisterModel.findOneAndUpdate(
        { username: username },     // Criterio de búsqueda
            updateData,             // Datos a actualizar
            { new: true }           // Opciones: devuelve el documento actualizado
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: "Usuario actualizado exitosamente",
            user: updatedUser
        });
    }
}