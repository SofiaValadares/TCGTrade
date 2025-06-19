import { useEffect, useState } from 'react';
import { getAllPagePokemons } from '@/app/services/pokemon';
import { PagePokemonResponseDto, PokemonPageRecordDto, PokemonResponseDto } from '@/app/types/pokemon';

export const usePokemonPage = (initialParams?: PokemonPageRecordDto) => {
    const [data, setData] = useState<PagePokemonResponseDto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [params, setParams] = useState<PokemonPageRecordDto>({
        page: 0,
        size: 10,
        sort: 'number',
        order: 'asc',
        ...initialParams,
    });

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getAllPagePokemons(params);
            setData(response);
        } catch (err: any) {
            console.error(err);
            setError('Erro ao carregar os dados.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    // 🔥 Dados de paginação prontos
    const currentPage = data?.number ?? 0;
    const totalPages = data?.totalPages ?? 1;
    const isFirstPage = data?.first ?? true;
    const isLastPage = data?.last ?? false;
    const totalItems = data?.totalElements ?? 0;
    const items: PokemonResponseDto[] = data?.content ?? [];

    // 🔥 Funções helpers
    const nextPage = () => {
        if (!isLastPage) {
            setPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (!isFirstPage) {
            setPage(currentPage - 1);
        }
    };

    const setPage = (page: number) => {
        setParams((prev) => ({ ...prev, page }));
    };

    const setSize = (size: number) => {
        setParams((prev) => ({ ...prev, size, page: 0 }));
    };

    const setSort = (sort: string, order: 'asc' | 'desc' = 'asc') => {
        setParams((prev) => ({ ...prev, sort, order }));
    };

    const setFilter = (filter: Partial<Omit<PokemonPageRecordDto, 'page' | 'size' | 'sort' | 'order'>>) => {
        setParams((prev) => ({ ...prev, ...filter, page: 0 }));
    };

    const updateParams = (newParams: Partial<PokemonPageRecordDto>) => {
        setParams((prev) => ({ ...prev, ...newParams }));
    };

    return {
        items,
        data,
        isLoading,
        error,
        params,
        currentPage,
        totalPages,
        totalItems,
        isFirstPage,
        isLastPage,
        setPage,
        nextPage,
        prevPage,
        setSize,
        setSort,
        setFilter,
        updateParams,
        refetch: fetchData,
    };
};
