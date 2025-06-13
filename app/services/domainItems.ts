import { fetchAPI } from '@/app/lib/apiClient';
import { BasePageResponse } from "@/app/types/common";
import { DomainItemsRecordDto, DomainItemsResponseDto, DomainItemsPageRecordDto} from '@/app/types/domainItems';

export const getAllDomainItems = async (idDomain?: number): Promise<DomainItemsResponseDto[]> => {
  const url = idDomain ? `/api/domain-items?idDomain=${idDomain}` : '/api/domain-items';
  return fetchAPI<DomainItemsResponseDto[]>(url, {
    method: 'GET'
  });
};

export const getOneDomainItems = async (id: number): Promise<DomainItemsResponseDto> => {
  return fetchAPI<DomainItemsResponseDto>(`/api/domain-items/${id}`, {
    method: 'GET'
  });
};

export const saveDomainItems = async (data: DomainItemsRecordDto): Promise<DomainItemsResponseDto> => {
  return fetchAPI<DomainItemsResponseDto>('/api/domain-items', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateDomainItems = async (id: number, data: DomainItemsRecordDto): Promise<DomainItemsResponseDto> => {
  return fetchAPI<DomainItemsResponseDto>(`/api/domain-items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deleteDomainItems = async (id: number): Promise<void> => {
  return fetchAPI<void>(`/api/domain-items/${id}`, {
    method: 'DELETE'
  });
};

export const getAllPageDomainItems = (params: DomainItemsPageRecordDto): Promise<BasePageResponse<DomainItemsResponseDto>> => {
  const queryParams = new URLSearchParams();
  if (params.page !== undefined) queryParams.append("page", String(params.page));
  if (params.size !== undefined) queryParams.append("size", String(params.size));
  if (params.sort) queryParams.append("sort", params.sort);
  if (params.order) queryParams.append("order", params.order);
  if (params.idDomain !== undefined) queryParams.append("idDomain", String(params.idDomain));
  if (params.codDomainItems) queryParams.append("codDomainItems", params.codDomainItems);
  if (params.name) queryParams.append("name", params.name);
  if (params.enabled !== undefined) queryParams.append("enabled", String(params.enabled));

  return fetchAPI<BasePageResponse<DomainItemsResponseDto>>(`/api/domain-items/page?${queryParams.toString()}`);
};
