import { Schema, z } from 'zod';

/**
 * Esquema de validación para el registro de usuario.
 * @type {z.ZodSchema}
 */
export const userSchema = z.object({
    username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
    passwordUser: z.string().min(8, { message: "La contraseña debe contener al menos 8 caracteres" }),
    cookie: z.string().min(1, { message: "La cookie es requerida" })
});

/**
 * Esquema de validación para el registro de usuario.
 * @type {z.ZodSchema}
 */
export const updateUserSchema = z.object({
    username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
    mail: z.string().min(1, { message: "El email es requerido" }).email("El email no está bien formado")
});





