import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGeneration } from '../services/generation';
import { GenerationRecordDto, GenerationResponseDto } from '../types/generation';

export const useUpdateGeneration = () => {
    const queryClient = useQueryClient();

    return useMutation<GenerationResponseDto, Error, { id: number; data: GenerationRecordDto }>({
        mutationFn: ({ id, data }) => updateGeneration(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generations'] });
        }
    });
};
