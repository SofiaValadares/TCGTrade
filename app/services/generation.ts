import { fetchAPI } from '@/app/lib/apiClient';
import {
  GenerationListResponseDto,
  GenerationRecordDto,
  GenerationResponseDto
} from '@/app/types/generation';

export const getAllGeneration = async (): Promise<GenerationListResponseDto[]> => {
  return fetchAPI<GenerationListResponseDto[]>('/api/generation', {
    method: 'GET'
  });
};

export const getOneGeneration = async (id: number): Promise<GenerationListResponseDto> => {
  return fetchAPI<GenerationListResponseDto>(`/api/generation/${id}`, {
    method: 'GET'
  });
};

export const saveGeneration = async (data: GenerationRecordDto): Promise<GenerationResponseDto> => {
  return fetchAPI<GenerationResponseDto>('/api/generation', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateGeneration = async (id: number, data: GenerationRecordDto): Promise<GenerationResponseDto> => {
  return fetchAPI<GenerationResponseDto>(`/api/generation/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const updateGenerationByNumber = async (number: number, data: GenerationRecordDto): Promise<GenerationResponseDto> => {
  return fetchAPI<GenerationResponseDto>(`/api/generation/${number}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deleteGeneration = async (id: number): Promise<void> => {
  return fetchAPI<void>(`/api/generation/${id}`, {
    method: 'DELETE'
  });
};

export const checkGenerationNumberExists = async (number: number): Promise<boolean> => {
  const response = await fetchAPI<{ exists: boolean }>(`/api/generation/exists?number=${number}`, {
    method: 'GET'
  });
  return response.exists;
};


