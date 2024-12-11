import { workspaceModel } from "../../database/models/workspaces.js";
import { generateInvitationUrl } from "../../utils/urlInvitation.js";

export class UrlInvitationController {
    static async checkWorkspaceId(req, res) {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ error: "No hay id en la peticion" });
            }
            const workspace = await workspaceModel.findById(id);
            if (!workspace) {
                return res.status(404).json({ error: "No existe una workspace con esa ID" });
            }
            const CorrectId = id;
            console.log (CorrectId)
            generateInvitationUrl(CorrectId)
        } catch (error) {
            console.error("Error validando la ID:", error);
            res.status(500).json({ error: "Internal server error" });
            InvitationWorkspace.constructor(CorrectId)
        }
    }
}
