export interface SortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableObject {
  offset: number;
  sort: SortObject;
  paged: boolean;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
}

export interface BasePageResponse<T> {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  sort: SortObject;
  numberOfElements: number;
  pageable: PageableObject;
  empty: boolean;
}

export interface BaseAuditFields {
  dateRegistered: string;
  userRegistered: string;
  dateChanged: string;
  userChanged: string;
} 