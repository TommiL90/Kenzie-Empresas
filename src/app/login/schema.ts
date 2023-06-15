
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().nonempty("precisa um mail cadastrado"),
    password: z.string().nonempty("precisa sua senha")
})

export type TLoginFormValues = z.infer<typeof loginSchema>;