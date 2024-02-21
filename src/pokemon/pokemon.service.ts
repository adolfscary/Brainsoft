import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
import { PokemonEntity } from "./entity/pokemon.entity.js";
import { prismaInclude } from "./pokemon.common.js";

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  toPokemonEntity(
    pokemon: NonNullable<Awaited<ReturnType<PokemonService["findById"]>>>,
  ): PokemonEntity {
    return {
      id: pokemon.id,
      externalId: pokemon.externalId,
      name: pokemon.name,
      classification: pokemon.classification,
      resistant: pokemon.resistant,
      weaknesses: pokemon.weaknesses,
      weight: pokemon.weight,
      height: pokemon.height,
      fleeRate: pokemon.fleeRate,
      evolutionRequirements: pokemon.evolutionRequirements,
      maxCP: pokemon.maxCP,
      maxHP: pokemon.maxHP,
      attacks: pokemon.attacks,
      updatedAt: pokemon.updatedAt,
      createdAt: pokemon.createdAt,
      evolutions: pokemon.evolutions.map(
        ({ id, externalId, name, updatedAt, createdAt }) => ({
          id,
          externalId,
          name,
          updatedAt,
          createdAt,
        }),
      ),
      previousEvolutions: pokemon.previousEvolutions.map(
        ({ id, externalId, name, updatedAt, createdAt }) => ({
          id,
          externalId,
          name,
          updatedAt,
          createdAt,
        }),
      ),
      types: pokemon.types.map(({ name }) => name),
    };
  }

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
    const { result: data, ...pageInfo } =
      await this.prisma.extended.pokemon.paginate({
        include: prismaInclude.pokemon,
        where: {
          ...(search?.name
            ? {
                name: {
                  mode: "insensitive",
                  contains: search.name,
                },
              }
            : {}),
          ...(filter?.type
            ? {
                types: {
                  some: {
                    name: filter.type,
                  },
                },
              }
            : {}),
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
        orderBy: { externalId: "asc" },
        limit,
        page,
      });

    return {
      data,
      pageInfo,
    };
  }

  findByName(name: string) {
    return this.prisma.pokemon.findUnique({
      include: prismaInclude.pokemon,
      where: { name },
    });
  }

  findByExternalId(externalId: string) {
    return this.prisma.pokemon.findUnique({
      include: prismaInclude.pokemon,
      where: { externalId },
    });
  }

  findById(id: string) {
    return this.prisma.pokemon.findUnique({
      include: prismaInclude.pokemon,
      where: { id },
    });
  }

  async types() {
    return this.prisma.pokemonType.findMany({
      orderBy: { name: "asc" },
    });
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
