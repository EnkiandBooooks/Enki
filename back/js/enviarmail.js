import transporter from "./transporter.js";

export const EnviarMail = (mail, random) => {

    transporter.sendMail({ //creamos el operador que enviara el mail
        from: process.env.EMAIL_USER, // el correo que envía
        to: mail, // a quién se lo enviamos
        subject: `Tu codigo de verificación de TupiTales`, // esto seria el encabezado
        text: `Información verificación`,
        html: ` <div style="width: 100%; max-width: 600px; margin: 0 auto; text-align: center; padding: 20px; border: 1px solid; border-radius: 8px;">
          <img src="cid:logo@enky.com" style="display: block; margin: 0 auto; width: 300px; height: auto; border-radius: 8px ;" />
          <h1>Código de verificación</h1>
          <p>Esto es el código de verificación que necesitarás para iniciar sesión: <br/><br/> <h1>${random}</h1></p>
          <div style="border-top: 1px solid #ddd; margin: 5px ;" />
          <p> En caso de que usted no haya iniciado sesión,<b> alguien a intentado entrar en tu cuenta de Enky</b>. Te recomendamos restablecer tu contraseña.</p>

        </div>
`,
        attachments: [
            {
                filename: 'logo.png',
                path: './img/logo.png',
                cid: 'logo@enky.com'
            }
        ]


        }, 



    (error, info) => { //info por si nos da error, sobretodo utilizado hasta que el codigo funcionase
        if (error) return console.log(error);
        console.log('Message sent: %s', info.messageId);
    });    
}
