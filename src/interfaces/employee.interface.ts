import {
  employeeRegisterSchema,
  employeeReturnSchema,
} from "@/schemas/employee.schema";
import { z } from "zod";

export type TEmployeeCreateRequest = z.infer<typeof employeeRegisterSchema>;
export type TEmployeeReturn = z.infer<typeof employeeReturnSchema>;
export type TEmployeesList = TEmployeeReturn[];
