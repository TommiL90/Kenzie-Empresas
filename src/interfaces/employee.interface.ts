import {
  employeeRegisterSchema,
  employeeReturnSchema,
  updateEmployeeSchema,
  updateEmployeeByAdminSchema,
  employeeSchema
} from "@/schemas/employee.schema";
import { type } from "os";
import { z } from "zod";

export type TEmployee = z.infer<typeof employeeSchema>

export type TEmployeeCreateRequest = z.infer<typeof employeeRegisterSchema>;

export type TEmployeeReturn = z.infer<typeof employeeReturnSchema>;

export type TEmployeesList = TEmployeeReturn[];

export type TEmployeeUpdateRequest = z.infer<typeof updateEmployeeSchema>

export type TEmployeeUpdateByAdminRequest = z.infer<typeof updateEmployeeByAdminSchema>