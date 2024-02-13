import { Test, TestingModule } from "@nestjs/testing";
import { setupDatabase, tearDownDatabase } from "../../test/database.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { PokemonController } from "./pokemon.controller.js";
import { PokemonModule } from "./pokemon.module.js";

describe("PokemonController", () => {
  let controller: PokemonController;
  let prisma: PrismaService;

  beforeEach(async () => {
    await setupDatabase();
    const module: TestingModule = await Test.createTestingModule({
      imports: [PokemonModule],
    }).compile();
    controller = module.get(PokemonController);
    prisma = module.get(PrismaService);
  });

  afterEach(async () => {
    await tearDownDatabase();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findById", () => {
    it("should get pokemon by id", async () => {
      const pokemon = await prisma.pokemon.findFirstOrThrow({
        where: { externalId: "001" },
      });
      const data = await controller.findById({ id: pokemon.id });
      expect(data?.id).toBe(pokemon.id);
      expect(data).toMatchSnapshot({
        id: expect.any(String),
        updatedAt: expect.any(Date),
        createdAt: expect.any(Date),
        evolutions: data.evolutions.map((evolution) => {
          return {
            ...evolution,
            id: expect.any(String),
            updatedAt: expect.any(Date),
            createdAt: expect.any(Date),
          };
        }),
        previousEvolutions: data.previousEvolutions.map((previousEvolution) => {
          return {
            ...previousEvolution,
            id: expect.any(String),
            updatedAt: expect.any(Date),
            createdAt: expect.any(Date),
          };
        }),
        types: data.types.map((type) => {
          return {
            ...type,
            id: expect.any(String),
            updatedAt: expect.any(Date),
            createdAt: expect.any(Date),
          };
        }),
      });
    });

    describe("findByName", () => {
      it("should get pokemon by name", async () => {
        const pokemon = await prisma.pokemon.findFirstOrThrow({
          where: { externalId: "001" },
        });
        const data = await controller.findByName({ name: pokemon.name });
        expect(data?.id).toBe(pokemon.id);
        expect(data).toMatchSnapshot({
          id: expect.any(String),
          updatedAt: expect.any(Date),
          createdAt: expect.any(Date),
          evolutions: data.evolutions.map((evolution) => {
            return {
              ...evolution,
              id: expect.any(String),
              updatedAt: expect.any(Date),
              createdAt: expect.any(Date),
            };
          }),
          previousEvolutions: data.previousEvolutions.map(
            (previousEvolution) => {
              return {
                ...previousEvolution,
                id: expect.any(String),
                updatedAt: expect.any(Date),
                createdAt: expect.any(Date),
              };
            },
          ),
          types: data.types.map((type) => {
            return {
              ...type,
              id: expect.any(String),
              updatedAt: expect.any(Date),
              createdAt: expect.any(Date),
            };
          }),
        });
      });
    });

    describe("paginate", () => {
      it("should paginate over pokemons", async () => {
        const user = await prisma.user.create({ data: { email: "test" } });
        const data = await controller.paginate({ limit: 1, page: 1 }, user);
        expect(data).toMatchSnapshot({
          data: data.data.map((one) => {
            return {
              ...one,
              id: expect.any(String),
              updatedAt: expect.any(Date),
              createdAt: expect.any(Date),
              evolutions: one.evolutions.map((evolution) => {
                return {
                  ...evolution,
                  id: expect.any(String),
                  updatedAt: expect.any(Date),
                  createdAt: expect.any(Date),
                };
              }),
              previousEvolutions: one.previousEvolutions.map(
                (previousEvolution) => {
                  return {
                    ...previousEvolution,
                    id: expect.any(String),
                    updatedAt: expect.any(Date),
                    createdAt: expect.any(Date),
                  };
                },
              ),
              types: one.types.map((type) => {
                return {
                  ...type,
                  id: expect.any(String),
                  updatedAt: expect.any(Date),
                  createdAt: expect.any(Date),
                };
              }),
            };
          }),
        });
      });
    });

    describe("paginateTypes", () => {
      it("should paginate over pokemons types", async () => {
        const data = await controller.paginateTypes({ limit: 1, page: 1 });
        expect(data).toMatchSnapshot({
          data: data.data.map((one) => {
            return {
              ...one,
              id: expect.any(String),
              updatedAt: expect.any(Date),
              createdAt: expect.any(Date),
            };
          }),
        });
      });
    });

    describe("updateFavorite", () => {
      it("should update user favorite pokemon", async () => {
        const user = await prisma.user.create({ data: { email: "test" } });
        const pokemon = await prisma.pokemon.findFirstOrThrow({
          where: { externalId: "001" },
        });
        await controller.updateFavorite(
          { id: pokemon.id },
          { favorite: true },
          user,
        );
        const updatedPokemon = await prisma.pokemon.findFirstOrThrow({
          where: { externalId: "001" },
        });
        expect(updatedPokemon.userIds).toEqual(
          expect.arrayContaining([user.id]),
        );
      });
    });
  });
});
