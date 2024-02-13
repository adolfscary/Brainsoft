import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module.js";
import { UserModule } from "../user/user.module.js";
import { PokemonController } from "./pokemon.controller.js";
import { PokemonService } from "./pokemon.service.js";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [PokemonService],
})
export class PokemonModule {}
