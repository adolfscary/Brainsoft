import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { PokemonModule } from "./pokemon/pokemon.module.js";
@Module({
  imports: [ConfigModule.forRoot(), PokemonModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
