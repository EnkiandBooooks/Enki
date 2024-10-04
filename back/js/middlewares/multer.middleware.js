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
}).single('file'); // Cambiamos el `.single` aquí para usarlo directamente

// Middleware modificado para inyectar req.file.filename
export const multerMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError || err) {
      return res.status(400).json({ message: err.message });
    }
    
    // Si el archivo fue cargado correctamente, inyectamos el filename
    req.filename = req.file.filename || `${req.user._id}${path.extname(req.file.originalname)}`;
    if (req.file) {
        
    }

    // Continuar con el siguiente middleware
    next();
  });
};