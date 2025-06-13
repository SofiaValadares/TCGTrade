import { fetchAPI } from '@/app/lib/apiClient';
import { PagePieceResponseDto } from '@/app/types/piece';

import { 
  PieceRecordDto, 
  PieceResponseDto
} from '@/app/types/piece';

export const getAllPieces = async (idProduct?: string): Promise<PieceResponseDto[]> => {
  const url = idProduct ? `/api/pieces?idProduct=${idProduct}` : '/api/pieces';
  return fetchAPI<PieceResponseDto[]>(url, {
    method: 'GET'
  });
};

export const getOnePiece = async (id: number): Promise<PieceResponseDto> => {
  return fetchAPI<PieceResponseDto>(`/api/pieces/${id}`, {
    method: 'GET'
  });
};

export const savePiece = async (data: PieceRecordDto): Promise<PieceResponseDto> => {
  return fetchAPI<PieceResponseDto>('/api/pieces', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updatePiece = async (id: number, data: PieceRecordDto): Promise<PieceResponseDto> => {
  return fetchAPI<PieceResponseDto>(`/api/pieces/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deletePiece = async (id: number): Promise<void> => {
  return fetchAPI<void>(`/api/pieces/${id}`, {
    method: 'DELETE'
  });
};

export const getAllPagePieces = async (
  page: number = 0,
  size: number = 10,
  sort: string = 'id',
  order: string = 'asc',
  idProduct?: number,
  name?: string
): Promise<PagePieceResponseDto> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
    order
  });

  if (idProduct) params.append('idProduct', idProduct.toString());
  if (name) params.append('name', name);

  return fetchAPI<PagePieceResponseDto>(`/api/pieces/page?${params.toString()}`, {
    method: 'GET'
  });
}; 