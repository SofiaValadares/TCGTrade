"use client";

import styles from './generationSection.module.scss';
import PokemonCard from "@/app/(auth)/home/components/PokemonCard/pokemonCard";
import Pagination from "@/app/components/Pagination/Pagination";

import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

import { GenerationListResponseDto } from "@/app/types/generation";
import { usePokemonPage } from "@/app/hooks/usePokemonPage";

interface GenerationSectionProps {
    generation: GenerationListResponseDto;
    isEditing?: boolean;
    onDeleteGeneration?: (id: number) => void;
    onEditGeneration?: (id: number) => void;
    onDeletePokemon?: (id: number) => void;
    onEditPokemon?: (id: number) => void;
}

export default function GenerationSection({
                                              generation,
                                              isEditing = false,
                                              onDeleteGeneration,
                                              onEditGeneration,
                                              onDeletePokemon,
                                              onEditPokemon
                                          }: GenerationSectionProps) {
    const {
        items,
        currentPage,
        totalPages,
        isLoading,
        setPage,
    } = usePokemonPage({
        generation: generation.number,
    });

    return (
        <div className={styles.generationSection}>
            <div className={styles.generationHeader}>
                <div>
                    <h1>{generation.region.toUpperCase()}</h1>
                    <p>GERAÇÃO {generation.number}</p>
                </div>

                {isEditing && (
                    <div className={styles.icons}>
                        <button
                            className={styles.editButton}
                            onClick={() => onEditGeneration?.(generation.idGeneration)}
                        >
                            <MdEdit size={18} />
                        </button>
                        <button
                            className={styles.closeButton}
                            onClick={() => onDeleteGeneration?.(generation.idGeneration)}
                        >
                            <IoClose size={18} />
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.pokemonSection}>
                {isLoading ? (
                    <p>Carregando pokémons...</p>
                ) : items.length > 0 ? (
                    items.map(pokemon => (
                        <PokemonCard
                            key={pokemon.idPokemon}
                            pokemon={pokemon}
                            isEditing={isEditing}
                            onDelete={onDeletePokemon}
                            onEdit={onEditPokemon}
                        />
                    ))
                ) : (
                    <p>Nenhum Pokémon encontrado.</p>
                )}
            </div>

            <div className={styles.pagination}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </div>
        </div>
    );
}
