import { useMutation, useQueryClient } from '@tanstack/react-query';
import { savePokemon } from '../services/pokemon';
import { PokemonRecordDto, PokemonResponseDto } from '../types/pokemon';

export const useCreatePokemon = () => {
    const queryClient = useQueryClient();

    return useMutation<PokemonResponseDto, Error, PokemonRecordDto>({
        mutationFn: savePokemon,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pokemons'] });
        },
    });
};
