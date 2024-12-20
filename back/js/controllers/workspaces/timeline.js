import { workspaceModel } from "../../database/models/workspaces.js";

export class TimelineController {
  static async getInfoTimeline(req, res) {
    const  IdWorkspace = req.params.id;

    try {
      const infoTimeline = await workspaceModel.findById(IdWorkspace);
      
      if (!infoTimeline) {
        return res.status(404).json({ message: "No se encontró la workspace." });
      }

      console.log(infoTimeline);
      return res.status(200).json(infoTimeline);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al cargar la información de la timeline." });
    }
  }
}
