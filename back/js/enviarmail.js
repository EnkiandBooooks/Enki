import transporter from "./transporter.js";

export const EnviarMail = (mail, random) => {

    transporter.sendMail({ //creamos el operador que enviara el mail
        from: process.env.EMAIL_USER, // el correo que envía
        to: mail, // a quién se lo enviamos
        subject: `Tu codigo de verificación de TupiTales`, // esto seria el encabezado
        text: `Información verificación`,
        html: `<b>Codigo de verificación</b> <p>Esto es el código de verificación que necesitarás para iniciar sesión: <br> ${random}</p>`,   }, 
    (error, info) => { //info por si nos da error, sobretodo utilizado hasta que el codigo funcionase
        if (error) return console.log(error);
        console.log('Message sent: %s', info.messageId);
    });    
}
