import styles from './generationsList.module.scss';
import { GenerationListResponseDto } from "@/app/types/generation";
import PokemonCard from "@/app/(auth)/home/components/PokemonCard/pokemonCard";
import React from "react";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

interface GenerationsListProps {
    generations: GenerationListResponseDto[];
    isEditing?: boolean;
    onDeleteGeneration?: (id: number) => void;
    onEditGeneration?: (id: number) => void;
    onDeletePokemon?: (id: number) => void;
    onEditPokemon?: (id: number) => void;
}

export default function GenerationsList({
                                            generations,
                                            isEditing = false,
                                            onDeleteGeneration,
                                            onEditGeneration,
                                            onDeletePokemon,
                                            onEditPokemon
                                        }: GenerationsListProps) {
    return (
        <div>
            {generations && generations.map((generation) => (
                <div key={generation.idGeneration} className={styles.generationSection}>
                    <div className={styles.generationHeader}>
                        <div>
                            <h1>{generation.region.toUpperCase()}</h1>
                            <p>GERAÇÃO {generation.number}</p>
                        </div>

                        {isEditing && (
                            <div className={styles.icons}>
                                <button
                                    className={styles.editButton}
                                    onClick={() => onEditGeneration && onEditGeneration(generation.idGeneration)}
                                >
                                    <MdEdit size={18} />
                                </button>
                                <button
                                    className={styles.closeButton}
                                    onClick={() => onDeleteGeneration && onDeleteGeneration(generation.idGeneration)}
                                >
                                    <IoClose size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className={styles.pokemonSection}>
                        {generation.pokemons.map(pokemon => (
                            <PokemonCard
                                key={pokemon.idPokemon}
                                pokemon={pokemon}
                                isEditing={isEditing}
                                onDelete={onDeletePokemon}
                                onEdit={onEditPokemon}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
