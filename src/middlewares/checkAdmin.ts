import { ForbiddenError } from "@/errors/ForbiddenError";
import { isAdmin } from "@/helpers/role";
import { Request, Response, NextFunction } from "express";

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (isAdmin(req.loggedUser?.role)) {
    throw new ForbiddenError();
  }

  next();
};
