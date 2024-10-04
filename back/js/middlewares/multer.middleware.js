import multer from "multer"; // Importa multer para el manejo de archivos
import path from "path";

// Configura el almacenamiento personalizado con el nombre original del archivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img/img_profile/"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const userId = req.user._id.toString(); //ID de usuario

    const extension = path.extname(file.originalname);
    // Guardar el archivo con su nombre original
    cb(null, `${userId}${extension}`);
  },
});

// Configura multer con restricciones de tipo de archivo y almacenamiento personalizado
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Define los tipos de archivos permitidos
    const allowedTypes = ["image/jpg", "image/png", "image/jpeg"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Acepta el archivo
    } else {
      cb(
        new Error(
          "Tipo de archivo no permitido. Solo se aceptan imágenes JPG, PNG y JPEG."
        )
      );
    }
  },
});

export const multerMiddleware = async (err, req, res, next) => {
  upload.single('file')
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};


