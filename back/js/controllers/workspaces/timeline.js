
import { workspaceModel } from "../../database/models/workspaces.js";
export class TimelineController {
static async getInfoTimeline(req, res) {
    const {IdWorkspace } = req.body;
    try {
        const infoTimeline = await workspaceModel.findbyId({_id: IdWorkspace })
        
        if (!infoTimeline || infoTimeline.length === 0) {
            return res.status(404).json({ message: "No public workspaces found." });
        }
        console.log(infoTimeline)
        return res.status(200).json(infoTimeline);
    } catch (error) {
        console.log(error)
        console.error(error);
        return res.status(500).json({message: "Error al cargar la información de la timeline"})
        
    }
    }
} 