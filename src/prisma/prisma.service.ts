import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

import {
  PrismaClientExtended,
  prismaClientExtends,
} from "./prisma.extended.js";

const NestJsPrismaClient = PrismaClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0],
) => PrismaClientExtended;

@Injectable()
export class PrismaService
  extends NestJsPrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    return prismaClientExtends(this as unknown as PrismaClient) as this;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
