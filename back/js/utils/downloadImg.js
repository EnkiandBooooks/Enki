import axios from 'axios';
import fs from 'fs'
export async function downloadImage(url, filename) {
    
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFile(filename, response.data, (err) => {
      if (err) throw err;
      console.log('Image descargada de forma correcta!');
    });
  }