"use client";

import styles from './generationsList.module.scss';

import { GenerationListResponseDto } from "@/app/types/generation";
import GenerationSection from "@/app/(auth)/home/components/GenerationSection/generationSection";

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
                                            onEditPokemon,
                                        }: GenerationsListProps) {
    if (!generations) {
        return <p>Carregando gerações...</p>;
    }

    return (
        <div>
            {generations.map(generation => (
                <GenerationSection
                    key={generation.idGeneration}
                    generation={generation}
                    isEditing={isEditing}
                    onDeleteGeneration={onDeleteGeneration}
                    onEditGeneration={onEditGeneration}
                    onDeletePokemon={onDeletePokemon}
                    onEditPokemon={onEditPokemon}
                />
            ))}
        </div>
    );
}
