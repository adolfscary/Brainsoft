import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmailOrCreate(email: string) {
    return this.prisma.user.upsert({
      where: { email },
      create: { email },
      update: {},
    });
  }

  async create({ email }: { email: string }) {
    return this.prisma.user.create({ data: { email } });
  }
}
