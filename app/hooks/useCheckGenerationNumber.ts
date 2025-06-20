import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {checkGenerationNumberExists} from "@/app/services/generation";


export const useCheckGenerationNumber = (
    number: number,
    shouldCheck: boolean,
    delay: number = 500
) => {
    const [debouncedNumber, setDebouncedNumber] = useState<number>(number);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedNumber(number);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [number, delay]);

    const query = useQuery({
        queryKey: ['generation-number-exists', debouncedNumber],
        queryFn: () => checkGenerationNumberExists(debouncedNumber),
        enabled: debouncedNumber > 0 && shouldCheck,
        staleTime: 1000 * 60,
    });

    return {
        exists: query.data,
        isChecking: query.isLoading,
    };
};
