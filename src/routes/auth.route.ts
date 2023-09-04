import { login } from "@/controllers/auth.controller";
import { validateForm } from "@/middlewares/validateForm";
import { loginSchema } from "@/schemas/auth/login";
import { Router } from "express";

const router = Router();

router.post("/login", validateForm(loginSchema), login);

export default router;
