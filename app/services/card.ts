import { fetchAPI } from '@/app/lib/apiClient';
import { BasePageResponse } from '@/app/types/common';
import {
    CardListResponseDto,
    CardRecordDto,
    CardResponseDto,
} from '@/app/types/card';

export const getAllCards = async (
    idPokemon?: number,
    idCollection?: number
): Promise<CardResponseDto[]> => {
    const params = new URLSearchParams();

    if (idPokemon !== undefined) {
        params.append('idPokemon', idPokemon.toString());
    }

    if (idCollection !== undefined) {
        params.append('idCollection', idCollection.toString());
    }

    return fetchAPI<CardResponseDto[]>(`/api/cards?${params.toString()}`, {
        method: 'GET',
    });
};


export const getOneCard = async (id: number): Promise<CardResponseDto> => {
    return fetchAPI<CardResponseDto>(`/api/cards/${id}`, {
        method: 'GET',
    });
};

export const saveCard = async (data: CardRecordDto): Promise<CardResponseDto> => {
    return fetchAPI<CardResponseDto>('/api/cards', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updateCard = async (
    id: number,
    data: CardRecordDto
): Promise<CardResponseDto> => {
    return fetchAPI<CardResponseDto>(`/api/cards/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const deleteCard = async (id: number): Promise<void> => {
    return fetchAPI<void>(`/api/cards/${id}`, {
        method: 'DELETE',
    });
};

interface CardPageParams {
    page?: number;
    size?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    idPokemon?: number;
    idCard?: number;
    nameCard?: string;
    collection?: number;
    numberCard?: number;
}

export const getAllPageCards = (
    params: CardPageParams
): Promise<BasePageResponse<CardResponseDto>> => {
    const queryParams = new URLSearchParams();
    if (params.page !== undefined) queryParams.append('page', String(params.page));
    if (params.size !== undefined) queryParams.append('size', String(params.size));
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.order) queryParams.append('order', params.order);
    if (params.idPokemon !== undefined) queryParams.append('idPokemon', String(params.idPokemon));
    if (params.idCard !== undefined) queryParams.append('idCard', String(params.idCard));
    if (params.nameCard) queryParams.append('nameCard', params.nameCard);
    if (params.collection !== undefined) queryParams.append('collection', String(params.collection));
    if (params.numberCard !== undefined) queryParams.append('numberCard', String(params.numberCard));

    return fetchAPI<BasePageResponse<CardResponseDto>>(`/api/cards/page?${queryParams.toString()}`);
};
