import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import fs from "fs";

const pokemons = JSON.parse(fs.readFileSync("./seed/pokemons.json").toString());

const prisma = new PrismaClient();

const pokemonCount = await prisma.pokemon.count();

if (pokemonCount > 0) {
  console.log(`Pokemons count is ${pokemonCount}, skipping seed`);
  process.exit(0);
}

for (const pokemon of pokemons) {
  const {
    id: externalId,
    types,
    name,
    classification,
    resistant,
    weaknesses,
    weight,
    height,
    fleeRate,
    evolutionRequirements,
    "Previous evolution(s)": previousEvolutions = [],
    evolutions = [],
    maxCP,
    maxHP,
    attacks,
  } = pokemon;
  await prisma.pokemon.create({
    data: {
      externalId,
      name,
      classification,
      resistant,
      weaknesses,
      weight,
      height,
      fleeRate,
      evolutionRequirements,
      maxCP,
      maxHP,
      attacks,
      types: {
        connectOrCreate: types.map((type: string) => {
          return {
            create: {
              name: type,
            },
            where: {
              name: type,
            },
          };
        }),
      },
      evolutions: {
        connectOrCreate: evolutions.map(
          ({ id: externalId, name }: { id: string; name: string }) => {
            return {
              where: {
                externalId: String(externalId),
              },
              create: {
                externalId: String(externalId),
                name,
              },
            };
          },
        ),
      },
      previousEvolutions: {
        connectOrCreate: previousEvolutions.map(
          ({ id: externalId, name }: { id: string; name: string }) => {
            return {
              where: {
                externalId: String(externalId),
              },
              create: {
                externalId: String(externalId),
                name,
              },
            };
          },
        ),
      },
    },
  });
}
