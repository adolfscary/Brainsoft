import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { objectIdSchema } from "../../common/dto/object-id.dto.js";

export const findByIdPokemonParamSchema = z.object({
  id: objectIdSchema,
});

export class FindByIdPokemonParamDto extends createZodDto(
  findByIdPokemonParamSchema,
) {}
