import { z } from 'zod';

/**
 * Esquema de validacion con Zod para controlador de  books > getById
 */
export const getByIdSchema = z.object({
    id: z.string()
        .min(1, "No se ha recibido un ID de libro")
        .regex(/^[A-Za-z0-9]+$/, "ID no valido")
});