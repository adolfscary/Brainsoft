import { ApiProperty } from "@nestjs/swagger";
import Prisma from "@prisma/client";

export class PokemonAttackEntity implements Partial<Prisma.PokemonAttack> {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  damage!: number;
}
