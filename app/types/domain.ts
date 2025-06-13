import { BaseAuditFields, BasePageResponse } from './common';
import { DomainItemsResponseDto } from './domainItems';
import { DomainItemsListResponseDto } from './domainItems'; 

export interface DomainPageRecordDto {
  page?: number;
  size?: number;
  sort?: string;
  order?: "asc" | "desc";
  name?: string;
  description?: string;
}

export interface DomainRecordDto {
  name: string;
  description?: string;
  enabled?: boolean;
}

export interface DomainResponseDto extends BaseAuditFields {
  idDomain: number;
  name: string;
  description: string;
  enabled: boolean;
}

export interface DomainListResponseDto {
  idDomain: number;
  name: string;
  description: string;
  enabled: boolean;
  domainItems: DomainItemsListResponseDto[];
}

export interface PageDomainResponseDto extends BasePageResponse<DomainResponseDto> {}
export interface PageDomainItemsResponseDto extends BasePageResponse<DomainItemsResponseDto> {}
