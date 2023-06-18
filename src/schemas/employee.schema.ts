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
  email: z.string().email("Formato de email inválido").max(150, "O email pode ter no máximo 150 carecteres").nonempty(),
  password: z.string().min(8).max(32).nonempty(),
  isAdmin: z.boolean(),
  companyId: z.string().nullish(),
  departamentId: z.string().nullish()
});

export const employeeRegisterSchema = employeeSchema.omit({
  id: true,
  isAdmin: true,
  companyId: true,
  departamentId: true
});

export const employeeReturnSchema = employeeSchema.omit({
  password: true
});

export const employeesListSchema = z.array(employeeReturnSchema);

export const updateEmployeeSchema = employeeSchema.partial().omit({
  id: true,
  isAdmin: true,
  companyId: true,
  departamentId: true
});

export const updateEmployeeByAdminSchema = employeeSchema.partial().omit({
  id: true,
  name: true,
  email: true,
  password: true
});
