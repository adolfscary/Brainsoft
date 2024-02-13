import { ApiProperty } from "@nestjs/swagger";
import Prisma from "@prisma/client";

export class PokemonTypeEntity implements Partial<Prisma.PokemonType> {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
