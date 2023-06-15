import { z } from "zod";
import { employeeReturnSchema } from "./employee.schema";

export const departamentSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, "O nome precisa ter ao menos 3 caracteres")
    .max(150, "O nome precisa ter no máximo 150 caracteres")
    .nonempty()
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  description: z.string().email("Formato de email inválido").max(45, "O email pode ter no máximo 45 carecteres").nonempty(),
  company_id: z.string().nonempty().uuid(),
  employees: z.array(employeeReturnSchema).optional()
});


export const createDepartamentSchema = departamentSchema.omit({
    id: true,
    employees: true
})

export const editDepartamentSchema = departamentSchema.pick({
    description: true
})

