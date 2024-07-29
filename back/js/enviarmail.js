import transporter from "./transporter.js";

export const EnviarMail = (mail, random) => {

    transporter.sendMail({ //creamos el operador que enviara el mail
        from: process.env.EMAIL_USER, // el correo que envía
        to: mail, // a quién se lo enviamos
        subject: `Correo de verificación`, // esto seria el encabezado
        text: `Esto es el código de verificación que necesitarás: \n ${random}` //random es el numero, esto seria el texto, y usamos comillas invertidas ``
    }, 
    (error, info) => { //info por si nos da error, sobretodo utilizado hasta que el codigo funcionase
        if (error) return console.log(error);
        console.log('Message sent: %s', info.messageId);
    });    
}
