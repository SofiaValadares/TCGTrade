import { useQuery } from "@tanstack/react-query";
import { getAllPokemons } from "../services/pokemon";
import { PokemonResponseDto } from "../types/pokemon";

export const usePokemonList = () => {
    return useQuery<PokemonResponseDto[]>({
        queryKey: ["pokemons"],
        queryFn: getAllPokemons,
    });
};
