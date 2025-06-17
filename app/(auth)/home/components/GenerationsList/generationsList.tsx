import styles from './generationsList.module.scss';
import { GenerationListResponseDto } from "@/app/types/generation";
import PokemonCard from "@/app/(auth)/home/components/PokemonCard/pokemonCard";
import React from "react";

interface GenerationsListProps {
    generations: GenerationListResponseDto[];
}

export default function GenerationsList({ generations }: GenerationsListProps) {
    return (
        <div>
            {generations && generations.map((generation) => (
                <div key={generation.idGeneration} className={styles.generationSection}>
                    <h1>{generation.region.toUpperCase()}</h1>
                    <p>GERAÇÃO {generation.number}</p>

                    <div className={styles.pokemonSection}>
                        {generation.pokemons.map(pokemon => (
                            <PokemonCard
                                key={pokemon.idPokemon}
                                pokemon={pokemon}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
