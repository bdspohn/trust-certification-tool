import { z } from "zod";

export const trustFormSchema = z.object({
  trustName: z.string().min(1, "Trust name is required"),
  dateOfTrust: z.string().min(1, "Date is required"),
  amendmentDate: z.string().optional(),
  beneficiaryName: z.string().optional(),
  trustType: z.enum(["Revocable", "Irrevocable"]),
  trustees: z.array(
    z.object({
      name: z.string().min(1, "Trustee name is required"),
      title: z.string().min(1, "Trustee title is required")
    })
  ).min(1, "At least one trustee is required"),
  powers: z.array(z.string()),
  otherPower: z.string().optional()
});
