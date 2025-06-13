import { BaseAuditFields, BasePageResponse } from './common';

export interface DomainItemsPageRecordDto {
  page?: number;
  size?: number;
  sort?: string;
  order?: "asc" | "desc";
  idDomain?: number;
  codDomainItems?: string;
  name?: string;
  enabled?: boolean;
}

export interface DomainItemsRecordDto {
  idDomain: number;
  codDomainItems: string;
  name: string;
  enabled?: boolean;
}

export interface DomainItemsResponseDto extends BaseAuditFields {
  idDomainItems: number;
  idDomain: number;
  codDomainItems: string;
  name: string;
  enabled: boolean;
}

export interface DomainItemsListResponseDto {
  idDomainItems: number;
  codDomainItems: string;
  name: string;
  enabled: boolean;
}

export interface PageDomainItemsResponseDto extends BasePageResponse<DomainItemsResponseDto> {}

