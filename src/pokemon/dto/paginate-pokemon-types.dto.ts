import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { PAGE_LIMIT_DEFAULT, PAGE_LIMIT_MAX } from "../../common/constants.js";

export const paginatePokemonTypesQuerySchema = z.object({
  limit: z.coerce
    .number()
    .min(1)
    .max(PAGE_LIMIT_MAX)
    .default(PAGE_LIMIT_DEFAULT),
  page: z.coerce.number().min(1).default(1),
});

export class PaginatePokemonTypesQueryDto extends createZodDto(
  paginatePokemonTypesQuerySchema,
) {}
