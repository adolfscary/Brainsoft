import { Prisma } from "@prisma/client";

export const prismaInclude: {
  pokemon: Prisma.PokemonInclude;
} = {
  pokemon: {
    evolutions: {
      orderBy: { externalId: "asc" },
    },
    previousEvolutions: {
      orderBy: {
        externalId: "asc",
      },
    },
    types: {
      orderBy: {
        name: "asc",
      },
    },
    users: true,
  },
};
