import { z } from 'zod'
export const passwordSchema = z.object({
    newPassword: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});