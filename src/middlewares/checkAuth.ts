import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { UserModel } from "@/models/user";
import { JWTPayload } from "@/types/jwt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError();
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    const user = await UserModel.getByIdOrThrow(id);
    req.loggedUser = user;

    next();
  } catch (_) {
    throw new UnauthorizedError();
  }
};
