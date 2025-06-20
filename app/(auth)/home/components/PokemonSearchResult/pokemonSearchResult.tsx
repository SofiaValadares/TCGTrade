"use client";

import React from "react";
import PokemonCard from "@/app/(auth)/home/components/PokemonCard/pokemonCard";
import Pagination from "@/app/components/Pagination/Pagination";

import { PokemonResponseDto } from "@/app/types/pokemon";
import style from "./pokemonSearchResult.module.scss";

interface PokemonSearchResultProps {
    pokemons: PokemonResponseDto[];
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
    isEditing?: boolean;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
}

export default function PokemonSearchResult({
                                                pokemons,
                                                isLoading,
                                                currentPage,
                                                totalPages,
                                                setPage,
                                                isEditing = false,
                                                onDelete,
                                                onEdit,
                                            }: PokemonSearchResultProps) {
    if (isLoading) return <p>Carregando pokémons...</p>;

    if (pokemons.length === 0) return <p>Nenhum Pokémon encontrado.</p>;

    return (
        <div className={style.generationSection}>
            {isLoading ? (
                <p>Carregando pokémons...</p>
            ) : pokemons.length > 0 ? (
                <div className={style.pokemonSection}>
                    {pokemons.map((pokemon) => (
                        <PokemonCard
                            key={pokemon.idPokemon}
                            pokemon={pokemon}
                            isEditing={isEditing}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </div>
            ) : (
                <p>Nenhum Pokémon encontrado.</p>
            )}

            <div className={style.pagination}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </div>
        </div>
    );
}
