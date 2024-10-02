import sharp from 'sharp';
import axios from 'axios';
import fs from 'fs'
import path from 'path'; // Necesario para manejar rutas correctamente

export async function downloadImage(url, filename) {
    
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFile(filename, response.data, (err) => {
      if (err) throw err;
      console.log('Image descargada de forma correcta!');
    });
  }

  

            
            // await sharp('../img/logo.png')
            //     .rotate()          // Rotar la imagen
            //     .resize(500, 500)  // Redimensionar la imagen a 500x500
            //     .toFile('img1.png'); // Guardar la imagen resultante

            // Responder con éxito

        






