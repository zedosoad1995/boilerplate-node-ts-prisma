import { NotFoundError } from "@/errors/NotFoundError";
import { hashPassword } from "@/helpers/password";
import prisma from "@/helpers/prismaClient";
import _ from "lodash";

const getByIdOrThrow = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

const add = async (data: any) => {
  const password = await hashPassword(data.password);

  return prisma.user.create({
    data: {
      ...data,
      password,
    },
  });
};

const editByIdOrThrow = async (id: string, data: any) => {
  await getByIdOrThrow(id);

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

const deleteByIdOrThrow = async (id: string) => {
  await getByIdOrThrow(id);

  return prisma.user.delete({
    where: {
      id,
    },
  });
};

function dump<T extends Record<string, any>>(user: T): Omit<T, "password" | "role"> {
  return _.omit(user, "password", "role") as Omit<T, "password" | "role">;
}

function dumpMany<T extends Record<string, any>>(users: T[]): Omit<T, "password" | "role">[] {
  return users.map((user) => _.omit(user, "password", "role") as Omit<T, "password" | "role">);
}

export const UserModel = {
  ...prisma.user,
  getByIdOrThrow,
  dump,
  dumpMany,
  add,
  editByIdOrThrow,
  deleteByIdOrThrow,
};
