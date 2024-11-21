import mongoose from "mongoose";
import { bookModel } from "../../database/models/obras.js";
import { userModel } from "../../database/models/users.js";
import { workspaceModel } from "../../database/models/workspaces.js";
import { workspaceSchema } from "../../schema/workspaces.js";

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
        const { communityName, book, stamps, privacy } = workspaceSchema.parse(req.body)

        const bookBD = await bookModel.find({title: book});

        try {
            const newWorkspace = new workspaceModel({
                workSpaceName: communityName,
                bookId: bookBD[0]._id,
                privacy: privacy,
                stamps: stamps
            });
            
            const workspace = await newWorkspace.save();
            const newInfo = {"workSpaces": workspace._id};
    
            await userModel.findByIdAndUpdate(user._id, { $push: newInfo})
        }catch(err){
            return res.status(400).json({"message": "Error in create workspace."})
        }

        return res.status(200).json({"message": "Workspace Created"});
    }

    /**
     * 
     * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los datos de usuario y contraseña.
     * @param {Object} req.params.id - Id de la workspace que esta guardada en la url.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     */
    static async getInfoWorkspace(req, res) {
        const workspaceId = req.params.id;
        const workspace = await workspaceModel.findById(workspaceId);

        res.status(200).json(workspace)
    }

    /**
     * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los datos de usuario y contraseña.
     * @param {Object} req.params.id - Id de la workspace que esta guardada en la url.
     * @param {Object} req.user - Array con toda la información del usuario.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     */
    static async deleteWorkspace(req, res) {
        const workspaceId = req.params.id;
        const user = req.user;

        await workspaceModel.findByIdAndDelete(workspaceId);
        await userModel.findByIdAndUpdate(user._id, {$pull: {workSpaces: workspaceId}})

        res.status(200).json({"message": "Community delete"})
    }
}