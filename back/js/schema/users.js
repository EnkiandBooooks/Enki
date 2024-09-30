import { z } from 'zod';

export const userSchema = z.object({
    username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
    passwordUser: z.string().min(8, { message: "La contraseña debe contener al menos 8 caracteres" }),
    cookie: z.string().min(1, { message: "La cookie es requerida" })
});