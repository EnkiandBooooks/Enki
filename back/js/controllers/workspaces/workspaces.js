import mongoose from "mongoose";
import { bookModel } from "../../database/models/obras.js";
import { userModel } from "../../database/models/users.js";
import { workspaceModel } from "../../database/models/workspaces.js";
import { workspaceSchema } from "../../schema/workspaces.js";

export class WorkspaceController{
    /**
     * Controlador que sirve para crear comunidades.
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
                book:{
                    bookId: bookBD[0]._id,
                    bookName: bookBD[0].title,
                    bookImage: bookBD[0].largeThumbnail,
                },
                privacy: privacy,
                stamps: stamps,
                members: {
                    memberId: user._id,
                    name: user.username,
                }
            });
            const workspace = await newWorkspace.save();
            const newInfo = {"workSpaces": workspace._id};
    
            await userModel.findByIdAndUpdate(user._id, { $push: newInfo})
        }catch(err){
            console.log("No funciono")
            return res.status(400).json({"message": "Error in create workspace."})
        }

        return res.status(200).json({"message": "Workspace Created"});
    }

    /**
     * Recibir información de las comunidades.
     * 
     * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los datos de usuario y contraseña.
     * @param {Object} req.params.id - Id de la workspace que esta guardada en la url.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     */
    
    static async getInfoWorkspace(req, res) {
        const workspaceId = req.params.id;
        // console.log("##########\n"+workspaceId+"##########\n");
        const workspace = await workspaceModel.findById(workspaceId);
        res.status(200).json(workspace)
    }

    /**
     * Borrar comunidades.
     * 
     * @param {Object} req - Objeto de solicitud (Request) de Express, que contiene los datos de usuario y contraseña.
     * @param {Object} req.params.id - Id de la workspace que esta guardada en la url.
     * @param {Object} req.user - Array con toda la información del usuario.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     */
    static async deleteWorkspace(req, res) {
        const workspaceId = req.params.id;
        const user = req.user;
        // Esto lo hago para probar en github.
        await workspaceModel.findByIdAndDelete(workspaceId);
        await userModel.findByIdAndUpdate(user._id, {$pull: {workSpaces: workspaceId}})

        res.status(200).json({"message": "Community delete"})
    }

    /**
     * Añadir un usuario a las comunidades.
     * 
     * @param {Object} req - Objeto de solicitud (Request) de Express.
     * @param {Object} req.params.id - Id de la workspace que esta guardada en la url.
     * @param {Object} req.user - Array con toda la información del usuario.
     * @param {Object} res - Objeto de respuesta (Response) de Express.
     * @returns 
     */
    static async addUserWorkspace(req, res) {
        const workspaceId = req.params.id;
        const user = req.user;
        
        const existUser = await workspaceModel.findOne({"members.memberId": user._id})
        if(existUser===null) {
            return res.status(300).json({"Message": "User already in this comunity."})
        }
        const newUser = {
            "memberId": user._id,
            "name": user.username,
        }
        try {
            console.log(await workspaceModel.findByIdAndUpdate(workspaceId, {$push: {members: newUser}})) 
            await userModel.findByIdAndUpdate(user._id, {$push: {workSpaces: workspaceId}})
        } catch (error) {
            return res.status(300).json({"message": "Error adding user"})
        }
        return res.status(200).json({"message": "User add"})
    }

    /**
     * @param {Object} req 
     * @param {Object} req.body.workspaceId - Id de la workspace.
     * @param {Object} req.body.userId - Id del usuario que se eliminará de la comunidad.
     * @param {Object} res 
     * @returns 
     */
    static async deleteUserWorkspace(req, res) {
        const workspaceId = req.body.workspaceId
        const userId = req.body.userId

        try {
            await workspaceModel.findByIdAndUpdate(workspaceId, {$pull: {members: {memberId: userId}}})
            await userModel.findByIdAndUpdate(userId, {$pull: {workSpaces: workspaceId}})
        } catch (error) {
            return res.status(300).json({"message": "Error deleting user of a comunity."})
        }
        

        return res.status(200).json({"message": "User delete"})
    }

    static async showUsersWorkspace(req, res) {
        const workspaceId = req.params.id;

        try {

           const workspaceUsers= await workspaceModel.findById(workspaceId,{"members":1 })
         
           return res.status(200).json(workspaceUsers)
            
        } catch (error) {
            return res.status(300).json({"message": "Error deleting user of a comunity."})
        }
    }

}