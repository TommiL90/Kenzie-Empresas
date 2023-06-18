import { z } from "zod";
import { employeeReturnSchema } from "./employee.schema";
import { departmentSchema } from "./department.schema";

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
  description: z
    .string()
    .min(5, "Descrição precisaminimo 5 caracteres")
    .max(50, "A descrição pode ter no máximo 50 carecteres")
    .nonempty("Parametro obrigatorio"),
  categoryId: z.string().nonempty().uuid(),
  departaments: z.array(departmentSchema).optional(),
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
  userId: z.string().uuid().nonempty(),
  departmentId: z.string().uuid().nonempty()
});
