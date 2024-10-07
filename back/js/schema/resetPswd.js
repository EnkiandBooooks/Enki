import { z } from 'zod'

/**
 * Esquema de validación para la nueva contraseña.
 * @type {z.ZodSchema}
 */
export const passwordSchema = z.object({
    newPassword: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});