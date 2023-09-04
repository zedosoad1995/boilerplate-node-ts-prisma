import { UserRole } from "@prisma/client";

export const isRegular = (role?: UserRole) => {
  return role === UserRole.REGULAR;
};

export const isAdmin = (role?: UserRole) => {
  return role === UserRole.ADMIN;
};
