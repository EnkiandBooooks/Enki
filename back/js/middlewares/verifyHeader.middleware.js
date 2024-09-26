export const verifyHeader = async (req, res, next) => {
    // Comprobamos que lleve una cabecera con el nombre "Authorization".
    if(!req.header('Authorization')) {      // Si no devuelve un mensaje.
        return res.status(401).json({ message: "You need the token in the header." });
    }
    next(); // Si lo tiene continuamos.
}