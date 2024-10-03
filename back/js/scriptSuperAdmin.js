// import { RegisterModel } from "./models/mongodb/register.js";
import { usuario } from "./schema/users.js";

const rol = { rol: "superAdmin" };
const correo = process.argv.slice(2);
const email = correo[0];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const query = { email: email };

console.log(query, rol);

async function updateRole() {
  if (emailPattern.test(email)) {
    console.log("Mail correcto");
    try {
      const result = await usuario.updateOne(query, { rol });
      if (result.matchedCount === 0) {
        console.log('Usuario no encontrado');
      } else if (result.modifiedCount === 0) {
        console.log('El rol ya era el valor proporcionado');
      } else {
        console.log('Rol actualizado con éxito');
      }
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
    }
  } else {
    console.log("Mail Incorrecto");
  }
}

updateRole();

// function updateSuperAdmin(correo){
//     RegisterModel.updateSuperRol( query, rol);
// }
