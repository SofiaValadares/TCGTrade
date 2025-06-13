import { BaseAuditFields, BasePageResponse } from './common';
import { PieceResponseDto } from './piece';

export interface ProductRecordDto {
  name: string;
  value: number;
}

export interface ProductResponseDto extends BaseAuditFields {
  idProduct: number;
  name: string;
  value: number;
  tax: number;
}

export interface PageProductResponseDto extends BasePageResponse<ProductResponseDto> {}

export interface PagePieceResponseDto extends BasePageResponse<PieceResponseDto> {} 