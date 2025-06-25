'use client';

import { useParams } from 'next/navigation';
import {usePokemonById} from "@/app/hooks/usePokemonById";
import PokemonDetail from "@/app/(auth)/pokemons/[id]/PokemonDetails";

export default function PokemonDetailPage() {
    const { id } = useParams();

    const { data: pokemon, isLoading, isError } = usePokemonById(Number(id));

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (isError || !pokemon) {
        return <p>Erro ao carregar o Pokémon.</p>;
    }

    return <PokemonDetail pokemon={pokemon} />;
}
