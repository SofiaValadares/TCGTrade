import {BaseAuditFields, BasePageResponse} from './common';

export const POKEMON_TYPES = [
  'NORMAL', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS', 'ICE',
  'FIGHTING', 'POISON', 'GROUND', 'FLYING', 'PSYCHIC', 'BUG',
  'ROCK', 'GHOST', 'DRAGON', 'DARK', 'STEEL', 'FAIRY',
] as const;

export type PokemonType = typeof POKEMON_TYPES[number];

export interface PokemonPageRecordDto {
  page?: number;
  size?: number;
  sort?: string;
  order?: "asc" | "desc";
  name?: string;
  number?: number;
}

export interface PokemonRecordDto {
  numPokemon: number;
  name: string;
  primaryType: PokemonType;
  secondaryType?: PokemonType;
}

export interface PokemonResponseDto extends BaseAuditFields {
  idPokemon: number;
  name: string;
  numPokemon: number;
  primaryType: PokemonType;
  secondaryType?: PokemonType;
}

export interface PagePokemonResponseDto extends BasePageResponse<PokemonResponseDto> {}