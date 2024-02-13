import { HttpException, HttpStatus } from "@nestjs/common";

export class AppEntityNotFound extends HttpException {
  constructor(options: { entity: string; key?: string; value: string }) {
    super(
      {
        message: `${options.entity} with ${options.key ?? "id"} '${options.value}' was not found`,
        error: "Not Found",
        status: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
