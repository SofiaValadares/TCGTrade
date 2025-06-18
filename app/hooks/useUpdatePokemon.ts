import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePokemon } from '../services/pokemon';
import { PokemonRecordDto, PokemonResponseDto } from '../types/pokemon';

export const useUpdatePokemon = () => {
    const queryClient = useQueryClient();

    return useMutation<PokemonResponseDto, Error, { id: number; data: PokemonRecordDto }>({
        mutationFn: ({ id, data }) => updatePokemon(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pokemons'] }); // 🔥 Atualiza a lista de pokémons
        },
    });
};
