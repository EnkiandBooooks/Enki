import { z } from "zod";

/**
 * Esquema de validación con Zod para los datos de usuario y contraseña.
 */
export const loginSchema = z.object({
  usr: z.string().min(1, "El nombre de usuario es obligatorio."),
  pwd: z.string().min(1, "La contraseña es obligatoria."),
});