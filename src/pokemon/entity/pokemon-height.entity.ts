import { ApiProperty } from "@nestjs/swagger";
import Prisma from "@prisma/client";

export class PokemonHeightEntity implements Partial<Prisma.PokemonHeight> {
  @ApiProperty()
  minimum!: string;

  @ApiProperty()
  maximum!: string;
}
