import 'dotenv/config';
import nodemailer from "nodemailer";


/**
 * Transporter de nodemailer configurado para enviar correos electrónicos
 * a través del servicio SMTP de Gmail.
 * 
 * @type {nodemailer.Transporter}
 * @property {Object} auth - Información de autenticación extraída del archivo .env
 * @property {string} auth.user - El usuario del correo.
 * @property {string} auth.pass - La contraseña del correo.
 */
const transporter = nodemailer.createTransport({ //creamos el transporter
    host: "smtp.gmail.com",
    port: 587, // el puerto correcto para el servicio SMTP de Gmail
    secure: false, // solo se usa true para el puerto 465
    auth: {
        user: process.env.EMAIL_USER, //estos son variables del archivo .dev
        pass: process.env.EMAIL_PASS //estos son variables del archivo .dev
    },
});

export default transporter; // Exportar el transporter
