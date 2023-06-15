import { z } from "zod";

export const employeeSchema = z.object({
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
  email: z.string().email("Formato de email inválido").max(45, "O email pode ter no máximo 45 carecteres").nonempty(),
  password: z.string().min(8).max(32).nonempty(),
  is_admin: z.boolean(),
  company_id: z.string().nullish(),
  department_id: z.string().nullish()
});

export const employeeRegisterSchema = employeeSchema.omit({
  id: true,
  is_admin: true,
  company_id: true,
  department_id: true
});

export const employeeReturnSchema = employeeSchema.omit({
  password: true
});

export const employeesListSchema = z.array(employeeReturnSchema);

export const UpdateEmployeeSchema = employeeSchema.partial();
