import { useEffect, useMemo, useState } from 'react';
import { getAllPagePokemons } from '@/app/services/pokemon';
import { PagePokemonResponseDto, PokemonPageRecordDto, PokemonResponseDto } from '@/app/types/pokemon';

export const usePokemonPage = (initialParams?: Partial<PokemonPageRecordDto>) => {
    const stableInitialParams: PokemonPageRecordDto = useMemo(() => ({
        page: initialParams?.page ?? 0,
        size: initialParams?.size ?? 10,
        sort: initialParams?.sort ?? 'number',
        order: initialParams?.order ?? 'asc',
        name: initialParams?.name,
        number: initialParams?.number,
        generation: initialParams?.generation,
    }), [
        initialParams?.page,
        initialParams?.size,
        initialParams?.sort,
        initialParams?.order,
        initialParams?.name,
        initialParams?.number,
        initialParams?.generation
    ]);

    const [params, setParams] = useState<PokemonPageRecordDto>(stableInitialParams);
    const [data, setData] = useState<PagePokemonResponseDto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getAllPagePokemons(params);
            setData(response);
        } catch (err) {
            console.error(err);
            setError('Erro ao carregar dados');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    const items: PokemonResponseDto[] = data?.content ?? [];

    const currentPage = data?.number ?? 0;
    const totalPages = data?.totalPages ?? 1;
    const isFirstPage = data?.first ?? true;
    const isLastPage = data?.last ?? false;

    const setPage = (page: number) => {
        setParams(prev => ({ ...prev, page }));
    };

    const updateParams = (newParams: Partial<PokemonPageRecordDto>) => {
        setParams(prev => ({ ...prev, ...newParams }));
    };

    return {
        items,
        isLoading,
        error,
        currentPage,
        totalPages,
        isFirstPage,
        isLastPage,
        setPage,
        updateParams,
        refetch: fetchData,
    };
};
