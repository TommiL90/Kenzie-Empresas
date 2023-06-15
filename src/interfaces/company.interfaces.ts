import { companySchema, createcompanySchema, editcompanySchema } from "@/schemas/company.schema";
import { z } from "zod";

export type TCompany = z.infer<typeof companySchema>;
export type TCreateCompany = z.infer<typeof createcompanySchema>;
export type TEditCompany = z.infer<typeof editcompanySchema>;
