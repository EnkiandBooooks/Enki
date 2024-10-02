import transporter from "../config/transporter.js";


export const EnviarMailpswd = (mail, temporaryUrl) => {
    transporter.sendMail({      //creamos el operador que enviara el mail
        from: process.env.EMAIL_USER,       // el correo que envía
        to: mail,       // a quién se lo enviamos 
        subject: `Solicitud de cambio de contraseña`,       // esto seria el encabezado
        text: `Solicitud de cambio de contraseña`,
        html: ` <div style="width: 100%; max-width: 600px; margin: 0 auto; text-align: center; padding: 20px; border: 1px solid; border-radius: 8px;">
                    <img src="cid:logo@enki.com" style="display: block; margin: 0 auto; width: 300px; height: auto; border-radius: 8px ;" />
                    <h1>CAMBIO DE CONTRASEÑA</h1>
                    <p>Para hacer el cambio, presione el siguiente <b>ENLACE</b>: <br/><br/> <a href="${temporaryUrl}" style="text-decoration: none;">
    <button style="background-color: #4CAF50; /* Verde */
                   border: none;
                   color: white;
                   padding: 15px 32px;
                   text-align: center;
                   text-decoration: none;
                   display: inline-block;
                   font-size: 16px;
                   margin: 4px 2px;
                   cursor: pointer;
                   border-radius: 8px;">
        Cambiar contraseña
    </button>
</a></p>
                <div style="border-top: 1px solid #ddd; margin: 5px ;" />
                <p> En caso de que usted no haya intentado cambiar la contraseña<b> alguien puede haber intentado entrar en su cuenta de Enki</b>. Le recomendamos restablecer su contraseña.</p>

        </div>
`,
        attachments: [
            {
                filename: 'logo5.png',
                path: './img/img_logo/logo5.png',
                cid: 'logo@enki.com'
            }
        ]
            }, )
        }
