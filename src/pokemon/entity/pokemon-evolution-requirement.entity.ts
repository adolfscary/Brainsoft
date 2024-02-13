import { ApiProperty } from "@nestjs/swagger";
import Prisma from "@prisma/client";

export class PokemonEvolutionRequirementEntity
  implements Partial<Prisma.PokemonEvolutionRequirements>
{
  @ApiProperty()
  amount!: number;

  @ApiProperty()
  name!: string;
}
