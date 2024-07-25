require("dotenv").config(); //esto es un requerimiento de nuestro archivo dev donde estaran nuestras credenciales
const nodemailer = require("nodemailer"); //subimos la libreria

const transporter = nodemailer.createTransport({ //creamos el transporter
    host: "smtp.gmail.com",
    port: 587, // el puerto correcto para el servicio SMTP de Gmail
    secure: false, // solo se usa true para el puerto 465
    auth: {
        user: process.env.EMAIL_USER, //estos son variables del archivo .dev
        pass: process.env.EMAIL_PASS //estos son variables del archivo .dev
    },
});

module.exports = transporter; //lo exportamos

