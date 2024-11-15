import mongoose from "mongoose";
import { bookModel } from "../../schema/obras/obras.js";
import { userModel, workspaceModel } from "../../schema/users.js";

export class WorkspaceController{
    /**
     * 
     * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los datos de usuario y contraseña.
     * @param {Object} req.user - Objecto con la información del usuario que ha creado la workspace.
     * @param {Object} req.body - Cuerpo de la solicitud con los datos de la workspace.
     * @param {Object} req.body.communityName - Nombre de la workspace a crear.
     * @param {Object} req.body.book - Nombre del libro de la comunidad.
     * @param {Object} req.body.stamps - Número de etapas de la timeline
     * @param {Object} req.body.privacity - Si la workspace es pública o privada.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     * 
     */
    static async createWorkspace(req, res) {
        const user = req.user;
        const name = req.body.communityName;
        const book = req.body.book;
        const stamps = req.body.stamps;
        const privacy = req.body.privacy;

        const bookBD = await bookModel.find({title: book});

        try {
            console.log("Request: ",req.body.privacy)
            const newWorkspace = new workspaceModel({
                workSpaceName: name,
                bookId: bookBD[0]._id,
                privacy: privacy,
                stamps: stamps
            });
            const workspace = await newWorkspace.save();
            const newInfo = {"workSpaces": workspace._id};
    
            await userModel.findByIdAndUpdate(user._id, { $push: newInfo})
        }catch(err){
            console.log(err);
            return res.status(400).json({"message": "Error in create workspace."})
            
        }
        // Comando para poder buscar todas las workspaces de un usuario.
        // await userModel.findOne({username: 'GerardAB'}).populate('workSpaces');

        return res.status(200).json({"message": "Workspace Created"});
    }

    static async getInfoWorkspace(req, res) {

    }
}