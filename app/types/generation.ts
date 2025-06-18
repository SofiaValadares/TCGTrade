import {BaseAuditFields, BasePageResponse} from './common';
import {PokemonResponseDto} from "@/app/types/pokemon";


export interface GenerationRecordDto {
  number: number;
  region: string;
}

export interface GenerationResponseDto extends BaseAuditFields {
  idGeneration: number;
  number: number;
  region: string;
}

export interface GenerationListResponseDto {
  idGeneration: number;
  number: number;
  region: string;
  pokemons: PokemonResponseDto[]
}

export interface PageGenerationResponseDto extends BasePageResponse<GenerationResponseDto> {}