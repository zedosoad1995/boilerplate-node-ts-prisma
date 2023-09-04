import {
  createOne,
  deleteMe,
  deleteOne,
  getMany,
  getMe,
  getOne,
  updateMe,
  updateOne,
} from "@/controllers/users.controller";
import { checkAdmin } from "@/middlewares/checkAdmin";
import { checkAuth } from "@/middlewares/checkAuth";
import { checkRegular } from "@/middlewares/checkRegular";
import { validateForm } from "@/middlewares/validateForm";
import { updateMeSchema } from "@/schemas/user/UpdateMe";
import { createUserSchema } from "@/schemas/user/createUser";
import { updateUserSchema } from "@/schemas/user/updateUser";
import { Router } from "express";

const router = Router();

router.get("/", checkAuth, checkAdmin, getMany);
router.get("/:userId", checkAuth, checkAdmin, getOne);
router.get("/me", checkAuth, getMe);
router.post("/", validateForm(createUserSchema), createOne);
router.patch("/:userId", checkAuth, checkAdmin, validateForm(updateUserSchema), updateOne);
router.patch("/me", checkAuth, validateForm(updateMeSchema), updateMe);
router.delete("/:userId", checkAuth, checkAdmin, deleteOne);
router.delete("/me", checkAuth, checkRegular, deleteMe);

export default router;
