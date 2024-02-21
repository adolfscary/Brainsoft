import { ApiProperty } from "@nestjs/swagger";

type PageInfo = {
  limit: number;
  page: number;
  count: number;
  exceedCount: boolean;
  exceedTotalPages: boolean;
};

export const paginateEntity = <T extends new () => unknown>(Model: T) => {
  class PaginateClass {
    @ApiProperty({ type: () => [Model] })
    data!: T;

    @ApiProperty({ type: () => PageInfoEntity })
    pageInfo!: PageInfoEntity;
  }

  Object.defineProperty(PaginateClass, "name", {
    value: `Paginate${Model.name}`,
  });

  return PaginateClass;
};

export class PageInfoEntity implements PageInfo {
  @ApiProperty()
  limit!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  count!: number;

  @ApiProperty()
  exceedCount!: boolean;

  @ApiProperty()
  exceedTotalPages!: boolean;
}
