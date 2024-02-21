import { ApiProperty } from "@nestjs/swagger";

export class PokemonTypesEntity {
  @ApiProperty({ type: () => [String] })
  data!: string[];
}
