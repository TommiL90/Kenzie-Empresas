import { createDepartmentSchema, departmentSchema, editDepartmentSchema } from "@/schemas/department.schema";
import { z } from "zod";

export type TDepartment = z.infer<typeof departmentSchema>;
export type TCreateDepartment = z.infer<typeof createDepartmentSchema>;
export type TEditDepartment = z.infer<typeof editDepartmentSchema>;
