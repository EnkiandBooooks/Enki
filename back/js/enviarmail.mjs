import transporter from "./transporter.mjs";
function getRandom(min,max) { //esta funcion es para crear el random
    return Math.random() * (max - min) + min;
  }
  
  let random = getRandom(100000,999999) //numero random de 6 digitos
  random = Math.trunc(random) //lo truncamos para que sea un entero

const EnviarMail = (mail) => {

    transporter.sendMail({ //creamos el operador que enviara el mail
        from: process.env.EMAIL_USER, // el correo que envía
        to: `${mail}`, // a quién se lo enviamos
        subject: `Correo de verificación`, // esto seria el encabezado
        text: `Esto es el código de verificación que necesitarás: \n ${random}` //random es el numero, esto seria el texto, y usamos comillas invertidas ``
    }, 
    
    (error, info) => { //info por si nos da error, sobretodo utilizado hasta que el codigo funcionase
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
    
}
  console.log(Math.trunc(random)) //imprime el numero que vamos a enviar.

  export { EnviarMail, random}; //exportamos el enviar mail




