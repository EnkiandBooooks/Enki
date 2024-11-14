import mongoose from "mongoose";
import { bookModel } from "../../schema/obras/obras.js";
import { userModel, workspaceModel } from "../../schema/users.js";

export class WorkspaceController{

    static async createWorkspace(req, res) {
        const user = req.user;
        const name = req.body.comunityName;
        const book = req.body.book;
        const stamps = req.body.stamps;
        const privacity = req.body.privacity;

        const bookBD = await bookModel.find({title: book});
        console.log(user._id)
        const newWorkspace = new workspaceModel({
            workSpaceName: name,
            bookId: bookBD[0]._id,
        });
        const newInfo = {"workspace": newWorkspace}
        userModel.findByIdAndUpdate(user._id, )
        res.status(200).json(newWorkspace);
    }
}