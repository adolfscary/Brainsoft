import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { PAGE_LIMIT_DEFAULT, PAGE_LIMIT_MAX } from "../../common/constants.js";

export const paginatePokemonsQuerySchema = z.object({
  "search[name]": z.string().optional(),
  "filter[type]": z.string().optional(),
  "filter[favorite]": z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
  limit: z.coerce
    .number()
    .min(1)
    .max(PAGE_LIMIT_MAX)
    .default(PAGE_LIMIT_DEFAULT),
  page: z.coerce.number().min(1).default(1),
});

export class PaginatePokemonsQueryDto extends createZodDto(
  paginatePokemonsQuerySchema.transform((query) => {
    return {
      search: {
        name: query["search[name]"] ?? undefined,
      },
      filter: {
        type: query["filter[type]"] ?? undefined,
        favorite: query["filter[favorite]"] ?? undefined,
      },
      limit: query.limit,
      page: query.page,
    };
  }),
) {}
