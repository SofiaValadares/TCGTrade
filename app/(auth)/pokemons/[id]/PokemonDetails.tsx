"use client";

import styles from './pokemonDetails.module.scss';
import { PokemonResponseDto } from "@/app/types/pokemon";
import React, { useState } from "react";
import PokemonsCardsSection from "@/app/(auth)/pokemons/[id]/components/PokemonsCardsSection/pokemonsCardsSection";
import PokemonDetailsCard from "@/app/(auth)/pokemons/[id]/components/PokemonDetailsCard/pokemonDetailsCard";

interface PokemonDetailsProps {
    pokemon: PokemonResponseDto;
    isEditing?: boolean;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
}

export default function PokemonDetails({
                                           pokemon,
                                           isEditing = false,
                                           onDelete,
                                           onEdit
                                       }: PokemonDetailsProps) {


    return (
        <div className={styles.pokemonDetailsContainer}>
            <PokemonDetailsCard pokemon={pokemon} />
            <h1>CARDS</h1>

            <PokemonsCardsSection idPokemon={pokemon.idPokemon} />
        </div>
    );
}
