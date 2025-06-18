import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePokemon } from "@/app/services/pokemon";

export const useDeletePokemon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deletePokemon(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["generations"] });
            // Isso atualiza as gerações, que incluem os pokémons
        },
        onError: (error) => {
            console.error("Erro ao deletar Pokémon:", error);
        },
    });
};
