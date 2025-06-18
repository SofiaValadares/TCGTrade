import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveGeneration } from '../services/generation';
import { GenerationRecordDto, GenerationResponseDto } from '../types/generation';

export const useCreateGeneration = () => {
    const queryClient = useQueryClient();

    return useMutation<GenerationResponseDto, Error, GenerationRecordDto>({
        mutationFn: saveGeneration,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generations'] });
        }
    });
};
