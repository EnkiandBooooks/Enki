import sharp from "sharp";
import { deleteFolder } from "../../img/delete.js";
// import {userId } from '../../routes/users/data.js'

/**
 * Recorta y redimensiona una imagen de perfil a 100x100 píxeles y la guarda en una nueva ruta.
 * 
 * @param {string} img - La ruta o el nombre de archivo de la imagen de entrada.
 * @param {string} find - El nombre de archivo de la imagen procesada (para rutas de entrada y salida).
 * @returns {void}
 * 
 * @example
 * // Procesa y redimensiona la imagen "user1.jpg" en la carpeta de perfiles
 * cuttImgProfile("user1.jpg", "user1.jpg");
 */


export function cuttImgProfile(img, find) {
    
    console.log(find)
    console.log(typeof(img))
    const imgPath = `img/img_profile/${find}`; 
    const outputPath = `img/img_profile_cut/${find}`; 


    sharp(imgPath)
    .rotate()
    .resize(100, 100)
    .toFile(outputPath, (err, info) => {
        if (err) {
            console.error("Error processing image:", err);
        } else {
            console.log("Image processed successfully:", info);
        }
        deleteFolder('img/img_profile_cut/')

    });
}

