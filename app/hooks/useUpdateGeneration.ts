import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGeneration } from '@/app/services/generation';
import { GenerationRecordDto } from '@/app/types/generation';

export const useUpdateGeneration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: GenerationRecordDto }) =>
            updateGeneration(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generations'] });
        },
    });
};
