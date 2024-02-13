import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const findByNamePokemonParamSchema = z.object({
  name: z.string(),
});

export class FindByNamePokemonParamDto extends createZodDto(
  findByNamePokemonParamSchema,
) {}
