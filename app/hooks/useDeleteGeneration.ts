import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGeneration } from '../services/generation';

export const useDeleteGeneration = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: deleteGeneration,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generations'] });
        }
    });
};
