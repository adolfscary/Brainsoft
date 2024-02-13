import { ApiProperty } from "@nestjs/swagger";
import Prisma from "@prisma/client";
import { PokemonAttackEntity } from "./pokemon-attack.entity.js";

export class PokemonAttacksEntity implements Partial<Prisma.PokemonAttacks> {
  @ApiProperty({ type: () => [PokemonAttackEntity] })
  fast!: PokemonAttackEntity[];

  @ApiProperty({ type: () => [PokemonAttackEntity] })
  special!: PokemonAttackEntity[];
}
