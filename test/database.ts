import { PrismaClient } from "@prisma/client";
import { exec as execChildProcess } from "child_process";
import util from "util";
import { v4 } from "uuid";

const exec = util.promisify(execChildProcess);
// supress all console.warn
console.warn = () => {};

export const setupDatabase = async () => {
  process.env.DATABASE_URL = `mongodb://mongodb:27017/${v4()}?replicaSet=rs0`;
  await exec(`yarn db:push`, { env: { ...process.env } });
  await exec(`yarn db:seed`, { env: { ...process.env } });
};

export const tearDownDatabase = async () => {
  const prisma = new PrismaClient();
  await prisma.$runCommandRaw({ dropDatabase: 1 });
  await prisma.$disconnect();
};
