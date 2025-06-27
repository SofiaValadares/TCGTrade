import { BaseAuditFields, BasePageResponse } from './common';

export type PokemonCardLanguageEnum =
    | 'JA'
    | 'EN'
    | 'DE'
    | 'FR'
    | 'IT'
    | 'ES'
    | 'PT_BR'
    | 'KO'
    | 'ZH_HANT'
    | 'ZH_HANS'
    | 'TH';

export interface CollectionRecordDto {
    name: string;
    series: string;
    language: PokemonCardLanguageEnum;
    code: string;
    ptcgoCode?: string;
    releaseDate: string; // ISO format string, e.g., "2025-06-25"
    totalCards: number;
    symbolUrl: string;
    logoUrl: string;
    defaultRotationLetter?: string;
}

export interface CollectionResponseDto extends BaseAuditFields {
    idCollection: number;
    name: string;
    series: string;
    language: PokemonCardLanguageEnum;
    code: string;
    ptcgoCode?: string;
    releaseDate: string;
    totalCards: number;
    symbolUrl: string;
    logoUrl: string;
    defaultRotationLetter?: string;
}

export interface CollectionListResponseDto {
    idCollection: number;
    name: string;
    series: string;
    language: PokemonCardLanguageEnum;
    code: string;
    ptcgoCode?: string;
    releaseDate: string;
    totalCards: number;
    symbolUrl: string;
    logoUrl: string;
    defaultRotationLetter?: string;
}

export type PageCollectionResponseDto = BasePageResponse<CollectionResponseDto>;
