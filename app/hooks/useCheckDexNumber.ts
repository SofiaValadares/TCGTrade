import { useQuery } from '@tanstack/react-query';
import { checkDexNumberExists } from '@/app/services/pokemon';
import { useEffect, useState } from 'react';


export const useCheckDexNumber = (
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
        queryKey: ['dex-number-exists', debouncedNumber],
        queryFn: () => checkDexNumberExists(debouncedNumber),
        enabled: debouncedNumber > 0 && shouldCheck,
        staleTime: 1000 * 60,
    });

    return {
        exists: query.data,
        isChecking: query.isLoading,
    };
};
