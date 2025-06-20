import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePokemon } from '@/app/services/pokemon';

export const useDeletePokemon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deletePokemon(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pokemon-page'] });
            queryClient.invalidateQueries({ queryKey: ['generations'] });
        },
    });
};
