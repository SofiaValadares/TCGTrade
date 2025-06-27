import { useQuery } from '@tanstack/react-query';
import { getAllPageCards } from '@/app/services/card';
import { CardPageRecordDto, PageCardResponseDto } from '@/app/types/card';

export const useCardPage = (params: CardPageRecordDto) => {
    return useQuery<PageCardResponseDto, Error>({
        queryKey: ['card-page', params],
        queryFn: () => getAllPageCards(params),
        placeholderData: (previousData) => previousData,
    });
};
