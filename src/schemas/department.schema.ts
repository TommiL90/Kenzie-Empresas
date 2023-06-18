import { z } from "zod";
import { employeeReturnSchema } from "./employee.schema";

export const departmentSchema = z.object({
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
  description: z
    .string()
    .min(5, "A descrição precisa ter no minimo 5 caracteres")
    .max(45, "A descrição pode ter no máximo 50 carecteres")
    .nonempty("arametro obrigatorio"),
  companyId: z.string().nonempty().uuid(),
  employees: z.array(employeeReturnSchema).optional()
});

export const createDepartmentSchema = departmentSchema.omit({
  id: true,
  employees: true
});

export const editDepartmentSchema = departmentSchema.pick({
  description: true
});
