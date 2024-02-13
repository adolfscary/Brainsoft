import { INestApplication } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import { Pokemon } from "@prisma/client";
import request from "supertest";
import { PrismaService } from "../src/prisma/prisma.service.js";
import { AppModule } from "./../src/app.module.js";
import { setupDatabase, tearDownDatabase } from "./database.js";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let pokemon: Pokemon;

  beforeEach(async () => {
    await setupDatabase();
    process.env.PORT = "0";
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = app.get(PrismaService);
    pokemon = await prisma.pokemon.findUniqueOrThrow({
      where: { externalId: "001" },
    });
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterEach(async () => {
    await app.close();
    await tearDownDatabase();
  });

  describe("/ (GET)", () => {
    it("should return 200", () => {
      return request(app.getHttpServer())
        .get("/healthz")
        .expect(200)
        .expect({ message: "ok" });
    });
  });

  describe("/pokemons/{id} (GET)", () => {
    it("should return 401", () => {
      return request(app.getHttpServer())
        .get(`/pokemons/${pokemon.id}`)
        .expect(401);
    });

    it("should return 404", () => {
      return request(app.getHttpServer())
        .get(`/pokemons/65c87390e83d5907a663f000`)
        .set("Authorization", "Bearer test")
        .expect(404);
    });

    it("should return 200", () => {
      return request(app.getHttpServer())
        .get(`/pokemons/${pokemon.id}`)
        .set("Authorization", "Bearer test")
        .expect(200);
    });
  });

  describe("/pokemons/name/{name} (GET)", () => {
    it("should return 401", () => {
      return request(app.getHttpServer())
        .get(`/pokemons/${pokemon.name}`)
        .expect(401);
    });

    it("should return 404", () => {
      return request(app.getHttpServer())
        .get(`/pokemons/name/not-found`)
        .set("Authorization", "Bearer test")
        .expect(404);
    });

    it("should return 200", () => {
      return request(app.getHttpServer())
        .get(`/pokemons/name/${pokemon.name}`)
        .set("Authorization", "Bearer test")
        .expect(200);
    });
  });
});
