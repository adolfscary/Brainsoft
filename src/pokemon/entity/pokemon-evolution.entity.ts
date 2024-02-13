import { ApiProperty } from "@nestjs/swagger";
import Prisma from "@prisma/client";

export class PokemonEvolutionEntity
  implements Partial<Prisma.PokemonEvolutions>
{
  @ApiProperty()
  id!: string;

  @ApiProperty()
  externalId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
