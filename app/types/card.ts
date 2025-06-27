import { BaseAuditFields, BasePageResponse } from './common';

export const POKEMON_TYPES = [
    'COLORLESS', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS',
    'FIGHTING', 'PSYCHIC', 'DRAGON', 'DARK', 'STEEL', 'FAIRY',
    'ITEM', 'TOOL', 'SUPPORTER', 'STADIUM', 'ENERGY'
] as const;

export const POKEMON_CARD_VARIANTS = [
    'NORMAL', 'HOLO', 'REVERSE_HOLO', 'POKEBALL_HOLO', 'MASTERBALL_HOLO',
    'COSMOS_HOLO', 'CRACKED_ICE_HOLO', 'NON_HOLO', 'PROMO',
    'FULL_ART', 'TEXTURED', 'GOLDEN'
] as const;

export const POKEMON_CARD_RARITIES = [
    'COMMON', 'UNCOMMON', 'RARE', 'RARE_HOLO', 'DOUBLE_RARE',
    'ILLUSTRATION_RARE', 'SPECIAL_ILLUSTRATION_RARE',
    'ULTRA_RARE', 'HYPER_RARE'
] as const;

export type PokemonType = typeof POKEMON_TYPES[number];
export type PokemonCardVariant = typeof POKEMON_CARD_VARIANTS[number];
export type PokemonCardRarity = typeof POKEMON_CARD_RARITIES[number];

export interface PokemonSummaryDto {
    idPokemon: number;
    name: string;
    number: number;
}

export interface CollectionSummaryDto {
    idCollection: number;
    name: string;
}

export interface CardListResponseDto {
    idCard: number;
    name: string;
    collection: CollectionSummaryDto;
    number: number;
    type: PokemonType;
    rotationLetter?: string;
    rarity: PokemonCardRarity;
    variants: PokemonCardVariant[];
    imageUrl: string;
    pokemon?: PokemonSummaryDto;
}

export interface CardRecordDto {
    name: string;
    idCollection: number;
    number: number;
    type: PokemonType;
    overrideRotationLetter?: string;
    rarity: PokemonCardRarity;
    variants: PokemonCardVariant[];
    imageUrl: string;
    idPokemon?: number;
}

export interface CardResponseDto extends BaseAuditFields {
    idCard: number;
    name: string;
    collection: CollectionSummaryDto;
    number: number;
    type: PokemonType;
    rotationLetter?: string;
    rarity: PokemonCardRarity;
    variants: PokemonCardVariant[];
    imageUrl: string;
    pokemon?: PokemonSummaryDto;
}


export interface CardPageRecordDto {
    page?: number;
    size?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    nameCard?: string;
    numberCard?: number;
    collection?: number;
    idPokemon?: number;
}


export interface CardResponseDto extends BaseAuditFields {
    idCard: number;
    name: string;
    collection: {
        idCollection: number;
        name: string;
    };
    number: number;
    type: PokemonType;
    rotationLetter?: string;
    rarity: PokemonCardRarity;
    variants: PokemonCardVariant[];
    imageUrl: string;
    pokemon?: {
        idPokemon: number;
        name: string;
        number: number;
    };
}

export interface PageCardResponseDto extends BasePageResponse<CardResponseDto> {}

