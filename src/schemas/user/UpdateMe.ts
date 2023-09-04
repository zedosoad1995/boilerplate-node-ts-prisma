import { UserRole } from "@prisma/client";
import { z } from "zod";

export const updateMeSchema = z
  .object({
    password: z.string().min(6).max(30),
  })
  .strict()
  .partial();
