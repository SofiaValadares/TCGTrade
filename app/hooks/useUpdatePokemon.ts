import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePokemon } from '@/app/services/pokemon';
import { PokemonRecordDto } from '@/app/types/pokemon';

export const useUpdatePokemon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: PokemonRecordDto }) =>
            updatePokemon(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pokemon-page'] });
            queryClient.invalidateQueries({ queryKey: ['generations'] });
        },
    });
};
