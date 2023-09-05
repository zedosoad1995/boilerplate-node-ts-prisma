import { UserRole } from "@prisma/client";
import { z } from "zod";

export const updateUserSchema = z
  .object({
    password: z.string().min(6).max(30),
    role: z.enum(Object.values(UserRole) as unknown as [string, ...string[]]),
  })
  .strict()
  .partial();
