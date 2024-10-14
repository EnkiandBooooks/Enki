import request from 'request'; 
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';


console.log(process.env)

let translate_key = process.env.TRANSLATE_KEY;
let translate_endpoint = process.env.TRANSLATE_KEY_ENDPOINT;
console.log(translate_endpoint)
function translateText(){
  let options = {
    method: 'POST',
    baseUrl: translate_endpoint,
    url: 'translate',
    qs: {
      'api-version': '3.0',
      'to': ['en', 'es']
    },
    headers: {
      'Ocp-Apim-Subscription-Key': translate_key,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    body: [{
      'text': 'Hello developer!'
    }],
    json: true,
  }
  request(options, (err, res, body) => {
    console.log(JSON.stringify(body, null, 4));
  })
};

translateText();


