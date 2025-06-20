import { useQuery } from '@tanstack/react-query';
import { getAllPagePokemons } from '@/app/services/pokemon';
import { PokemonPageRecordDto, PagePokemonResponseDto } from '@/app/types/pokemon';

export const usePokemonPage = (params: PokemonPageRecordDto) => {
    return useQuery<PagePokemonResponseDto, Error>({
        queryKey: ['pokemon-page', params],
        queryFn: () => getAllPagePokemons(params),
        placeholderData: (previousData) => previousData,
    });
};
