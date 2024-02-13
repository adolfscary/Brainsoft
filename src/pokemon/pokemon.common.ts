import { Prisma } from "@prisma/client";

export const prismaSelect: {
  pokemon: Prisma.PokemonSelect;
  pokemonType: Prisma.PokemonTypeSelect;
} = {
  pokemon: {
    id: true,
    externalId: true,
    name: true,
    classification: true,
    resistant: true,
    weaknesses: true,
    weight: true,
    height: true,
    fleeRate: true,
    evolutionRequirements: true,
    maxCP: true,
    maxHP: true,
    attacks: true,
    updatedAt: true,
    createdAt: true,
    evolutions: {
      select: {
        id: true,
        externalId: true,
        name: true,
        updatedAt: true,
        createdAt: true,
      },
    },
    previousEvolutions: {
      select: {
        id: true,
        externalId: true,
        name: true,
        updatedAt: true,
        createdAt: true,
      },
    },
    types: {
      select: {
        id: true,
        name: true,
        updatedAt: true,
        createdAt: true,
      },
    },
  },
  pokemonType: {
    id: true,
    name: true,
    updatedAt: true,
    createdAt: true,
  },
};
