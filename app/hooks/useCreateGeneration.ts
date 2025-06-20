import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveGeneration } from '@/app/services/generation';
import { GenerationRecordDto } from '@/app/types/generation';

export const useCreateGeneration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: GenerationRecordDto) => saveGeneration(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generations'] });
        },
    });
};
