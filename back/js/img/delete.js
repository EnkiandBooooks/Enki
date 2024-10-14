import fs from 'fs';

const Path = 'img_profile_cut/';

export function deleteFolder(Path) {try {
  const files = fs.readdirSync(Path);

  // Itera sobre cada archivo y lo elimina
  files.forEach((file) => {
    if (file !== '.gitkeep'){  
      const filePath = `${Path}${file}`;
      fs.unlinkSync(filePath);
      console.log(`Deleted all the file: ${filePath}`)
    }
  });

  console.log(`All files in ${Path} have been deleted.`);
} catch (err) {
  console.log('An error occurred:', err.message);
}
}
