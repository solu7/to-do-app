import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "¡El nombre de usuario debe tener al menos 3 caracteres!")
      .max(20, "¡El nombre de usuario no puede exceder los 20 caracteres!"),
    email: z.string().email("¡Formato de correo electrónico inválido!"),
    password: z
      .string()
      .min(6, "¡La contraseña debe tener al menos 6 caracteres!")
      .regex(/[A-Z]/, "¡La contraseña debe tener al menos una letra mayúscula!")
      .regex(/[a-z]/, "¡La contraseña debe tener al menos una letra minúscula!")
      .regex(/[0-9]/, "¡La contraseña debe tener al menos un número!")
      .regex(
        /[^A-Za-z0-9]/,
        "¡La contraseña debe tener al menos un símbolo especial!"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });