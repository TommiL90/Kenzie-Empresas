import { string, z } from "zod";


export const categorySchema = z.object({
  id: z.string().uuid(),
  name: string().nonempty()
});

export const createCategorySchema = categorySchema.omit({
  id: true
});
