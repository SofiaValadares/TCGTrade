import { fetchAPI } from '@/app/lib/apiClient';
import { BasePageResponse} from '@/app/types/common';
import { 
  DomainPageRecordDto,
  DomainRecordDto, 
  DomainResponseDto, 
  DomainListResponseDto
} from '@/app/types/domain';

export const getAllDomains = async (): Promise<DomainResponseDto[]> => {
  return fetchAPI<DomainResponseDto[]>('/api/domains', {
    method: 'GET'
  });
};

export const getOneDomain = async (id: number): Promise<DomainResponseDto> => {
  return fetchAPI<DomainResponseDto>(`/api/domains/${id}`, {
    method: 'GET'
  });
};

export const saveDomain = async (data: DomainRecordDto): Promise<DomainResponseDto> => {
  return fetchAPI<DomainResponseDto>('/api/domains', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateDomain = async (id: number, data: DomainRecordDto): Promise<DomainResponseDto> => {
  return fetchAPI<DomainResponseDto>(`/api/domains/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deleteDomain = async (id: number): Promise<void> => {
  return fetchAPI<void>(`/api/domains/${id}`, {
    method: 'DELETE'
  });
};


export const getAllPageDomains = (params: DomainPageRecordDto): Promise<BasePageResponse<DomainResponseDto>> => {
  const queryParams = new URLSearchParams();
  if (params.page !== undefined) queryParams.append("page", String(params.page));
  if (params.size !== undefined) queryParams.append("size", String(params.size));
  if (params.sort) queryParams.append("sort", params.sort);
  if (params.order) queryParams.append("order", params.order);
  if (params.name) queryParams.append("name", params.name);
  if (params.description) queryParams.append("description", params.description);

  return fetchAPI<BasePageResponse<DomainResponseDto>>(`/api/domains/page?${queryParams.toString()}`);
};

export const getAllDomainsList = async (idDomain: number): Promise<DomainListResponseDto> => {
  return fetchAPI<DomainListResponseDto>(`/api/domains/list/${idDomain}`, {
    method: 'GET'
  });
};
