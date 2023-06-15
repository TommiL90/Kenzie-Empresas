import { z } from "zod";
import { employeeReturnSchema } from "./employee.schema";
import { departamentSchema } from "./departament.schema";

export const companySchema = z.object({
  id: z.string().uuid(),
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
  category_id: z.string().nonempty().uuid(),
  departaments: z.array(departamentSchema).optional(),
  employees: z.array(employeeReturnSchema).optional()
});

export const createcompanySchema = companySchema.omit({
  id: true,
  employees: true,
  departaments: true
});

export const editcompanySchema = companySchema.pick({
  description: true
});

export const hireUser = z.object({
  user_uuid: z.string().uuid().nonempty(),
  department_uuid: z.string().uuid().nonempty()
});
