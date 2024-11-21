import { workspaceModel } from "../../database/models/workspaces.js";
export class CommentsController {
    static async createComments(req, res) {
        const comment = req.body.text;
        const user = req.user;
        const workspace = req.body.workspace
        console.log("Parametros: ",req.body)
        try {
            const newComment = {
                "text": comment,
                "user": {
                    "commentUserId": user._id,
                    "userName": user.username,
                },
            };
            await workspaceModel.findByIdAndUpdate(workspace, { $push: {"timeline.comment": newComment }},{ new: true});   
        }catch(err){
            console.log(err);
            return res.status(400).json({"message": "Error creating comment"})
        }
        res.status(200).json("Funciona");
    }
    static async getComments(req, res) {
        const workspace = req.body.workspace
        try {
            const comments = await workspaceModel.findById(workspace, { "timeline.comment": 1, _id: 0} ); 
            console.log("Comments: ", comments.timeline)
            res.status(200).json({
                message:"Comments ok",
                response: comments
            });
        }catch(err){
            console.log(err);
            return res.status(400).json({"message": "Error getting comment"})
        }
    }
    static async deleteComments(req, res) {
        const workspace = req.body.workspaceId;
        const commentId = req.body.commentId;
        try {
            await workspaceModel.findByIdAndUpdate(workspace, { $pull: { "timeline.comment": {  _id: commentId } } });
            res.status(200).json({ message:"Comments deleted" });
        }catch(err){
            console.log(err);
            return res.status(400).json({"message": "Error deleteing comment"})
        }
    }
}