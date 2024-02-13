import { ApiProperty } from "@nestjs/swagger";
import {
  PageNumberCounters,
  PageNumberPagination,
} from "prisma-extension-pagination/dist/types.js";

type PageInfo = PageNumberPagination & PageNumberCounters;

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
  isFirstPage!: boolean;

  @ApiProperty()
  isLastPage!: boolean;

  @ApiProperty()
  currentPage!: number;

  @ApiProperty({ nullable: true })
  previousPage!: number | null;

  @ApiProperty({ nullable: true })
  nextPage!: number | null;

  @ApiProperty()
  pageCount!: number;

  @ApiProperty()
  totalCount!: number;
}
