import { ApiProperty } from "@nestjs/swagger";
import Prisma from "@prisma/client";
import { PokemonAttacksEntity } from "./pokemon-attacks.entity.js";
import { PokemonEvolutionRequirementEntity } from "./pokemon-evolution-requirement.entity.js";
import { PokemonEvolutionEntity } from "./pokemon-evolution.entity.js";
import { PokemonHeightEntity } from "./pokemon-height.entity.js";
import { PokemonWeightEntity } from "./pokemon-weight.entity.js";

export class PokemonEntity implements Partial<Prisma.Pokemon> {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  externalId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  classification!: string;

  @ApiProperty({ type: [String] })
  resistant!: Prisma.Pokemon["resistant"];

  @ApiProperty({ type: [String] })
  weaknesses!: Prisma.Pokemon["weaknesses"];

  @ApiProperty({ type: () => PokemonWeightEntity })
  weight!: PokemonWeightEntity;

  @ApiProperty({ type: () => PokemonHeightEntity })
  height!: PokemonHeightEntity;

  @ApiProperty()
  fleeRate!: number;

  @ApiProperty({
    type: () => PokemonEvolutionRequirementEntity,
    nullable: true,
  })
  evolutionRequirements!: PokemonEvolutionRequirementEntity | null;

  @ApiProperty()
  maxCP!: number;

  @ApiProperty()
  maxHP!: number;

  @ApiProperty({ type: () => PokemonAttacksEntity })
  attacks!: PokemonAttacksEntity;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ type: () => [PokemonEvolutionEntity] })
  evolutions!: PokemonEvolutionEntity[];

  @ApiProperty({ type: () => [PokemonEvolutionEntity] })
  previousEvolutions!: PokemonEvolutionEntity[];

  @ApiProperty({ type: () => [String] })
  types!: string[];
}
