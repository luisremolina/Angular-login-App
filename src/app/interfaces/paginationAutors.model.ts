import { Autor } from "./autor.model";

export interface PaginationAutors {
  pageSize: number;
  page: number;
  sort: string;
  sortDirection: string;
  pagesQuantity: number;
  data: Autor[];
  filterValue: {};
  totalRows: number;
}
