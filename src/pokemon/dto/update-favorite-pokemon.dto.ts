import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { objectIdSchema } from "../../common/dto/object-id.dto.js";

export const updateFavoritePokemonParamSchema = z.object({
  id: objectIdSchema,
});

export class UpdateFavoritePokemonParamDto extends createZodDto(
  updateFavoritePokemonParamSchema,
) {}

export const updateFavoritePokemonBodySchema = z.object({
  favorite: z.boolean(),
});

export class UpdateFavoritePokemonBodyDto extends createZodDto(
  updateFavoritePokemonBodySchema,
) {}
