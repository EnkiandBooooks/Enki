import { RegisterModel } from "./models/mongodb/register.js";
const rol =  {rol: "superAdmin"}
const correo = process.argv.slice(2);
const email = correo[0];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const query = {mail : email};

console.log(query, rol)
if (emailPattern.test(email)) {
    console.log("Mail correcto")
    updateSuperAdmin(email);
}
else {
    console.log("Mail Incorrecto")
}



function updateSuperAdmin(correo){
    RegisterModel.updateSuperRol( query, rol);
}