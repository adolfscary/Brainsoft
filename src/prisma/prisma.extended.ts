import { PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";

export type PrismaClientExtended = ReturnType<typeof prismaClientExtends>;

export const prismaClientExtends = (prismaClient: PrismaClient) => {
  return prismaClient.$extends(pagination());
};
