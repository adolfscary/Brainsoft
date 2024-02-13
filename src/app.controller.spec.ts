import { Test, TestingModule } from "@nestjs/testing";
import { setupDatabase, tearDownDatabase } from "../test/database.js";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    await setupDatabase();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(async () => {
    await tearDownDatabase();
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.healthz()).toMatchObject({ message: "ok" });
    });
  });
});
