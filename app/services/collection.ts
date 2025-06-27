import { fetchAPI } from '@/app/lib/apiClient';
import { CollectionRecordDto, CollectionResponseDto, CollectionListResponseDto } from '@/app/types/collection';
import { BasePageResponse } from '@/app/types/common';

export interface CollectionPageRecordDto {
    page?: number;
    size?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    name?: string;
    series?: string;
}

export const getAllCollections = async (): Promise<CollectionResponseDto[]> => {
    return fetchAPI<CollectionResponseDto[]>('/api/collections', {
        method: 'GET'
    });
};

export const getOneCollection = async (id: number): Promise<CollectionResponseDto> => {
    return fetchAPI<CollectionResponseDto>(`/api/collections/${id}`, {
        method: 'GET'
    });
};

export const saveCollection = async (data: CollectionRecordDto): Promise<CollectionResponseDto> => {
    return fetchAPI<CollectionResponseDto>('/api/collections', {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

export const updateCollection = async (id: number, data: CollectionRecordDto): Promise<CollectionResponseDto> => {
    return fetchAPI<CollectionResponseDto>(`/api/collections/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
};

export const deleteCollection = async (id: number): Promise<{ message: string }> => {
    return fetchAPI<{ message: string }>(`/api/collections/${id}`, {
        method: 'DELETE'
    });
};

export const getAllPageCollections = (params: CollectionPageRecordDto): Promise<BasePageResponse<CollectionResponseDto>> => {
    const queryParams = new URLSearchParams();
    if (params.page !== undefined) queryParams.append('page', String(params.page));
    if (params.size !== undefined) queryParams.append('size', String(params.size));
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.order) queryParams.append('order', params.order);
    if (params.name) queryParams.append('name', params.name);
    if (params.series) queryParams.append('series', params.series);

    return fetchAPI<BasePageResponse<CollectionResponseDto>>(`/api/collections/page?${queryParams.toString()}`);
};

export const getCollectionWithCards = async (id: number): Promise<CollectionListResponseDto> => {
    return fetchAPI<CollectionListResponseDto>(`/api/collections/list/${id}`, {
        method: 'GET'
    });
};
