import { PrismaClient } from "@prisma/client";
import * as prismaPaginate from "prisma-paginate";

export type PrismaClientExtended = ReturnType<typeof prismaClientExtended>;

export const prismaClientExtended = (prismaClient: PrismaClient) => {
  return prismaClient.$extends(prismaPaginate.extension);
};
