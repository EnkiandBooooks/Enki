import { optional, z } from 'zod';

export const getUserSchema = z.object({
    username: z.string()
        .min(1, "Debe haber nombre de usuario"),
    email: z.string()
        .min(1, "Debe haber un correo"),
    rol: z.string()
        .min(1, "Debe tener un correo"),
    createdAt: z.date().nullish(),
    img: z.string().nullish()
});