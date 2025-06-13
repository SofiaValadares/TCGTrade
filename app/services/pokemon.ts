import { fetchAPI } from '@/app/lib/apiClient';
import { BasePageResponse} from '@/app/types/common';
import { 
  PokemonPageRecordDto,
  PokemonRecordDto, 
  PokemonResponseDto
} from '@/app/types/pokemon';

export const getAllPokemons = async (): Promise<PokemonResponseDto[]> => {
  return fetchAPI<PokemonResponseDto[]>('/api/pokemon', {
    method: 'GET'
  });
};

export const getOnePokemon = async (id: number): Promise<PokemonResponseDto> => {
  return fetchAPI<PokemonResponseDto>(`/api/pokemon/${id}`, {
    method: 'GET'
  });
};

export const savePokemon = async (data: PokemonRecordDto): Promise<PokemonResponseDto> => {
  return fetchAPI<PokemonResponseDto>('/api/pokemon', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updatePokemon = async (id: number, data: PokemonRecordDto): Promise<PokemonResponseDto> => {
  return fetchAPI<PokemonResponseDto>(`/api/pokemon/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deletePokemon = async (id: number): Promise<void> => {
  return fetchAPI<void>(`/api/pokemon/${id}`, {
    method: 'DELETE'
  });
};


export const getAllPagePokemons = (params: PokemonPageRecordDto): Promise<BasePageResponse<PokemonResponseDto>> => {
  const queryParams = new URLSearchParams();
  if (params.page !== undefined) queryParams.append("page", String(params.page));
  if (params.size !== undefined) queryParams.append("size", String(params.size));
  if (params.sort) queryParams.append("sort", params.sort);
  if (params.order) queryParams.append("order", params.order);
  if (params.name) queryParams.append("name", params.name);
  if (params.number) queryParams.append("number", String(params.number));

  return fetchAPI<BasePageResponse<PokemonResponseDto>>(`/api/pokemon/page?${queryParams.toString()}`);
};



