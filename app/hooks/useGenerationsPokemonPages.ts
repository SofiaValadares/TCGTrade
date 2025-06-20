import { GenerationListResponseDto } from "@/app/types/generation";
import { getAllPagePokemons } from "@/app/services/pokemon";
import { useQueries } from '@tanstack/react-query';
import { PagePokemonResponseDto } from "@/app/types/pokemon";

export const useGenerationsPokemonPages = (generations: GenerationListResponseDto[]) => {
    const queries = useQueries({
        queries: generations.map((generation) => ({
            queryKey: ['pokemon-page', generation.number],
            queryFn: () =>
                getAllPagePokemons({
                    generation: generation.number,
                    page: 0,
                    size: 10,
                    sort: 'number',
                    order: 'asc',
                }),
        })),
    });

    return generations.map((generation, index) => {
        const query = queries[index];

        return {
            generation,
            items: query.data?.content ?? [],
            isLoading: query.isLoading,
            currentPage: query.data?.number ?? 0,
            totalPages: query.data?.totalPages ?? 1,
            setPage: (page: number) => {
                query.refetch(); // Simples, mas se quiser mudar de página, o ideal é implementar via queryKey dinâmica com o page embutido
            },
            refetch: query.refetch,
        };
    });
};
