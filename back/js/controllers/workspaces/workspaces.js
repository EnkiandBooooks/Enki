export class WorkspaceController{

    static async createWorkspace(req, res) {
        const user = req.user;
        res.status(200).json("Funciona");
    }
}