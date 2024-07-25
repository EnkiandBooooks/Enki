const mail = require("./index.js")

const transporter = require("./transporter"); //creamos la constante transporter y importamos la info de ./transporter

const EnviarMail = (mail) => {

    transporter.sendMail({ //creamos el operador que enviara el mail
        from: "cesarrobresroyuela@gmail.com", // el correo que envía
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
function getRandom(min,max) { //esta funcion es para crear el random
    return Math.random() * (max - min) + min;
  }
  
  let random = getRandom(100000,999999) //numero random de 6 digitos
  random = Math.trunc(random) //lo truncamos para que sea un entero
  exports.EnviarMail = EnviarMail;
  exports.random = random; 
  console.log(Math.trunc(random)) //imprime el numero que vamos a enviar.





