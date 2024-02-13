import { z } from "nestjs-zod/z";

export const objectIdSchema = z.string().regex(/^[0-9a-f]{24}$/);
