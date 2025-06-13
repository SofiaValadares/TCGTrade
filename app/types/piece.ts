import { BaseAuditFields, BasePageResponse } from './common';

export interface PieceRecordDto {
  idProduct: number;
  name: string;
}

export interface PieceResponseDto extends BaseAuditFields {
  idPiece: number;
  name: string;
  idProduct: number;
  nameProduct: string;
}

export interface PagePieceResponseDto extends BasePageResponse<PieceResponseDto> {} 