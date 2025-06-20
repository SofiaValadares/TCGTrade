import { useQuery } from '@tanstack/react-query';
import { getOnePokemon } from '@/app/services/pokemon';
import { PokemonResponseDto } from '@/app/types/pokemon';

export const usePokemonById = (id: number | null) => {
    return useQuery<PokemonResponseDto>({
        queryKey: ['pokemon', id],
        queryFn: () => {
            if (id === null) {
                return Promise.reject('ID inválido');
            }
            return getOnePokemon(id);
        },
        enabled: id !== null,
    });
};
