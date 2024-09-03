import { EnviarMail } from "../utils/enviarmail.js"; //improtamos EnviarMail y Random
import { getNumRandom } from "../utils/random.js";

let mail = ""

export class mailController {
    static async recibirMail (req, res){ //creamos la funcion para recibir el mail
        mail = req.body.email;
        res.status(200).json({ message: "Email recibido."});
    }

    static async enviarMail (req, res) { //esta funcion 
        const numRandom = getNumRandom();
        
        EnviarMail(mail, numRandom);
        res.status(200).send({code: numRandom});
    }
}