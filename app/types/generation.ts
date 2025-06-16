import {BaseAuditFields, BasePageResponse} from './common';


export interface GenerationRecordDto {
  idGeneration: number;
  number: number;
  region: string;
}

export interface GenerationResponseDto extends BaseAuditFields {
  idGeneration: number;
  number: number;
  region: string;
}

export interface PageGenerationResponseDto extends BasePageResponse<GenerationResponseDto> {}