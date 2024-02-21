import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const findByExternalIdPokemonParamSchema = z.object({
  externalId: z.string(),
});

export class FindByExternalIdPokemonParamDto extends createZodDto(
  findByExternalIdPokemonParamSchema,
) {}
