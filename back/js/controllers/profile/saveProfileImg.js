import { downloadProfileImage } from "../../utils/saveProfileImg.js";
export class saveProfileImgController {
    static async recibirImg(req, res) { 
        // try {
            // Obtener el título de la imagen desde el cuerpo de la solicitud
            const ProfileImg = req.body.img; //http://localhost:1234/ProfileImg
            console.log(ProfileImg)
            if (!ProfileImg) {
                return res.status(404).json({ message: 'Error al recibir la URL' });
            }
        }
    }
            
//             downloadProfileImage(ProfileImg, `img/img_libros/${ProfileImg}_thumbnail.png`)
//             // Responder con el thumbnailURL
//             // return res.status(200).json({ thumbnail: thumbnailURL });

//         } catch (error) {
//             // Manejar errores y enviar respuesta al cliente
//             console.error('Error al buscar la obra1:', error);
//             return res.status(500).json({ message: 'Error al buscar la obra', error });
//         }
//     }
// }