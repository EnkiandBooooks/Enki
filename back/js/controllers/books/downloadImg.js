import { bookModel } from "../../schema/obras/obras.js";
import { downloadImage } from "../../utils/downloadImg.js";
export class downloadImgController {
    static async recibirImg(req, res) { 
        try {
            // Obtener el título de la imagen desde el cuerpo de la solicitud
            const titlebookImg = req.body.title;
            const bookImg = await bookModel.find({ title: titlebookImg });
            console.log(bookImg)
            if (!bookImg) {
                return res.status(404).json({ message: 'Error al buscar la obra' });
            }
            const thumbnailURL = bookImg[0].thumbnail;
            downloadImage(thumbnailURL, `img/img_libros/${titlebookImg}_thumbnail.png`)
            // Responder con el thumbnailURL
            return res.status(200).json({ thumbnail: thumbnailURL });
        } catch (error) {
            // Manejar errores y enviar respuesta al cliente
            console.error('Error al buscar la obra1:', error);
            return res.status(500).json({ message: 'Error al buscar la obra', error });
        }
    }
}