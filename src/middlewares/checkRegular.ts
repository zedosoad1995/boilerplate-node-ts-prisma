import { ForbiddenError } from "@/errors/ForbiddenError";
import { isRegular } from "@/helpers/role";
import { Request, Response, NextFunction } from "express";

export const checkRegular = async (req: Request, res: Response, next: NextFunction) => {
  if (!isRegular(req.loggedUser?.role)) {
    throw new ForbiddenError();
  }

  next();
};
