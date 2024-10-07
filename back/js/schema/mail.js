import { z } from "zod";
// import { RegisterModel} from '../database/mongodb/register.js'
import { userModel } from "./users.js";

/**
 * Esquema de validación para el correo electrónico de registro.
 * - `email`: Correo electrónico obligatorio, bien formado, y no registrado.
 * 
 * @type {z.ZodSchema}
 */
export const getMailSchema = z.object({
    email: z.string()
        .min(1, "El email es obligatorio")
        .email("El email no está bien formado")
        .refine(async (email) => {
            // const emailExists = await RegisterModel.searchUser({ mail: email }) === null;
            const emailExists = await userModel.findOne({ email : email});
            return emailExists === null;
        }, {
            message: "El email ya está registrado",
        })
});
/**
 * Esquema de validación para la verificación de código.
 * @type {z.ZodSchema}
 */
export const verifyCodeSchema = z.object({
    cookie: z.string().min(1, "La cookie es obligatoria"),
    codigo: z.number().min(1,"El código es obligatorio")
});