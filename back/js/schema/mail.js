import { z } from "zod";
// import { RegisterModel} from '../database/mongodb/register.js'
import { userModel } from "./users.js";

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

export const verifyCodeSchema = z.object({
    cookie: z.string().min(1, "La cookie es obligatoria"),
    codigo: z.number().min(1,"El código es obligatorio")
});