import { createDepartamentSchema, departamentSchema, editDepartamentSchema } from "@/schemas/departament.schema";
import { z } from "zod";


export type TDepartament = z.infer<typeof departamentSchema>;
export type TCreateDepartament = z.infer<typeof createDepartamentSchema>;
export type TEditDepartament = z.infer<typeof editDepartamentSchema>;
