// formSchema.js
import * as z from "zod";

export const trustFormSchema = z.object({
  trustName: z.string().min(1, "Trust name is required"),
  trustDate: z.string().min(1, "Trust date is required"),
  trustees: z.array(
    z.object({
      name: z.string().min(1, "Trustee name is required"),
      title: z.string().min(1, "Trustee title is required"),
    })
  ),
  investmentPowers: z.string().optional(),
  distributionPowers: z.string().optional(),
  administrativePowers: z.string().optional(),
  restrictions: z.string().optional(),
});
