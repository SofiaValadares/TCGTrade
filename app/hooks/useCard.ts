import { useQuery } from '@tanstack/react-query';
import { getAllCards } from '@/app/services/card';
import { CardResponseDto } from '@/app/types/card';

export const useCard = (idPokemon?: number, idCollection?: number) => {
    return useQuery<CardResponseDto[]>({
        queryKey: ['cards', { idPokemon, idCollection }],
        queryFn: () => getAllCards(idPokemon, idCollection),
    });
};
