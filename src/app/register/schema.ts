import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().nonempty("Nome é requerido").min(3, "Nome precisa pelo menos 3 letras").max(20, "Nome precisa ser menos de 20 letras"),
    email: z.string().nonempty("Email é requerido").email("escribir mail en formato correto"),
    password: z
      .string()
      .min(6, "O password precisa ter ao menos 6 caracteres")
      .max(120, "O password precisa ter no máximo 120 caracteres")
      .regex(new RegExp(".*[A-Z].*"), "O password precisa ter ao menos uma letra maiúscula")
      .regex(new RegExp(".*[a-z].*"), "O password precisa ter ao menos uma letra minéscula")
      .regex(new RegExp(".*\\d.*"), "O password precisa ter ao menos um némero")
      .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "O password precisa ter ao menos um caractere especial"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Os passwords não conferem, precisam ser iguais",
    path: ["confirmPassword"]
  });

export type TRegisterFormValues = z.infer<typeof registerSchema>;
