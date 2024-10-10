import multer from "multer"; // Importa multer para el manejo de archivos
import path from "path";

// Configura el almacenamiento personalizado con el nombre original del archivo
const storage = multer.diskStorage({
  /**
   * Especifica la carpeta de destino para guardar los archivos.
   * 
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} file - Objeto del archivo a subir.
   * @param {Function} cb - Función de callback para definir la ruta de destino.
   */
  destination: (req, file, cb) => {
    cb(null, "img/img_profile/"); // Carpeta donde se guardarán las imágenes
  },
   /**
   * Define el nombre del archivo a almacenar usando el ID del usuario y la extensión del archivo original.
   * 
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} file - Objeto del archivo a subir.
   * @param {Function} cb - Función de callback para definir el nombre del archivo.
   */
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
   /**
   * Filtro de tipos de archivos permitidos.
   * 
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} file - Objeto del archivo a subir.
   * @param {Function} cb - Función de callback para aceptar o rechazar el archivo.
   */
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
/**
 * Middleware para manejar la carga de archivos usando multer y añadir el nombre del archivo cargado al objeto de solicitud.
 * 
 * @function multerMiddleware
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para continuar con el siguiente middleware.
 * @returns {void}
 * 
 * @example
 * // Ejemplo de uso en una ruta
 * app.post('/upload', multerMiddleware, (req, res) => {
 *   res.send({ message: 'Archivo subido exitosamente', filename: req.filename });
 * });
 */
export const multerMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError || err) {
      return res.status(400).json({ message: err.message });
    }
    
    if(!req.file === undefined) {   // Comprobamos si existe una imagen y si existe la guardamos en la request.
      req.filename = req.file.filename;
    }
    next();
  });
};