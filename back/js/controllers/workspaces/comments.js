import { userModel, workspaceModel } from "../../schema/users.js";
export class CommentsController {
    static async createComments(req, res) {
        const comment = req.body.text;
        const userID = req.body.commentUserID;
        const username = req.body.userName;
        const workspace = req.body.workspace
        console.log("PArametros: ",req.body)
        try {
            const newComment = {
                "text": comment,
                "user": {
                    "commentUserId": userID,
                    "userName": username,
                },
            };
            await workspaceModel.findByIdAndUpdate(workspace, { $push: { comment: newComment }},{ new: true});   
        }catch(err){
            console.log(err);
            return res.status(400).json({"message": "Error creating comment"})
        }
        res.status(200).json("Funciona");
    }
}