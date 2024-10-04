import sharp from "sharp";
// import {userId } from '../../routes/users/data.js'

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
    });
}

