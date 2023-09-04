import { ForbiddenError } from "@/errors/ForbiddenError";
import { isAdmin } from "@/helpers/role";
import { UserModel } from "@/models/user";
import { Request, Response } from "express";

export const getMany = async (req: Request, res: Response) => {
  const users = await UserModel.findMany();

  return res.status(200).json({ users: UserModel.dumpMany(users) });
};

export const getOne = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await UserModel.getByIdOrThrow(userId);

  return res.status(200).json(UserModel.dump(user));
};

export const getMe = async (req: Request, res: Response) => {
  const loggedUser = req.loggedUser!;

  return res.status(200).json(UserModel.dump(loggedUser));
};

export const createOne = async (req: Request, res: Response) => {
  const newUser = await UserModel.add(req.body);

  return res.status(201).json(UserModel.dump(newUser));
};

export const updateOne = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const loggedUser = req.loggedUser!;

  if (userId === loggedUser.id && req.body.role) {
    throw new ForbiddenError("User cannot update his own role");
  }

  const updatedUser = await UserModel.editByIdOrThrow(userId, req.body);

  return res.status(200).json(UserModel.dump(updatedUser));
};

export const updateMe = async (req: Request, res: Response) => {
  const loggedUser = req.loggedUser!;

  const updatedUser = await UserModel.editByIdOrThrow(loggedUser.id, req.body);

  return res.status(200).json(UserModel.dump(updatedUser));
};

export const deleteOne = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const loggedUser = req.loggedUser!;

  if (userId === loggedUser.id) {
    throw new ForbiddenError("Admin cannot delete himself");
  }

  await UserModel.deleteByIdOrThrow(userId);

  return res.status(204).send();
};

export const deleteMe = async (req: Request, res: Response) => {
  const loggedUser = req.loggedUser!;

  await UserModel.deleteByIdOrThrow(loggedUser.id);

  return res.status(204).send();
};
