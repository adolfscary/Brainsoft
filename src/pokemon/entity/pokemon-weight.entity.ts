import { ApiProperty } from "@nestjs/swagger";
import Prisma from "@prisma/client";

export class PokemonWeightEntity implements Partial<Prisma.PokemonWeight> {
  @ApiProperty()
  minimum!: string;

  @ApiProperty()
  maximum!: string;
}
