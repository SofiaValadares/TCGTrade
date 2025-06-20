import { useMutation, useQueryClient } from '@tanstack/react-query';
import { savePokemon } from '@/app/services/pokemon';
import { PokemonRecordDto } from '@/app/types/pokemon';

export const useCreatePokemon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PokemonRecordDto) => savePokemon(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pokemon-page'] });
            queryClient.invalidateQueries({ queryKey: ['generations'] });
        },
    });
};
