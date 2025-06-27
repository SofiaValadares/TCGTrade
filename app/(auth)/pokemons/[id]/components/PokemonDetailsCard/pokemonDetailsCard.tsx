"use client";

import React, { useState } from "react";
import {PokemonResponseDto} from "@/app/types/pokemon";
import styles from "./pokemonDetailsCard.module.scss";
import {MdCatchingPokemon} from "react-icons/md";
import {theme} from "@/app/styles/theme";

interface PokemonDetailsCardProps {
    pokemon: PokemonResponseDto
}

const getTypeIcon = (type: string) => {
    return `https://raw.githubusercontent.com/SofiaValadares/PokemonImgs/main/types/${type.toLowerCase()}.svg`;
};

export default function PokemonDetailsCard({pokemon}: PokemonDetailsCardProps) {
    return (
        <div className={styles.detailsCard}>
            <div className={styles.imageContainer}>
                {pokemon.imageUrl ? (
                    <img src={pokemon.imageUrl} alt={pokemon.name}/>
                ) : (
                    <MdCatchingPokemon color={theme.text.primary} size={50}/>
                )}
            </div>

            <div className={styles.detailsInfo}>
                <h1>#{pokemon.number} </h1>
                <h1>{pokemon.name}</h1>
                <p>{pokemon.generation}º GERAÇÃO</p>
                <div className={styles.types}>
                    <img
                        className={styles.typeIcon}
                        src={getTypeIcon(pokemon.primaryType)}
                        alt={pokemon.primaryType}
                        title={pokemon.primaryType}
                    />
                    {pokemon.secondaryType && (
                        <img
                            className={styles.typeIcon}
                            src={getTypeIcon(pokemon.secondaryType)}
                            alt={pokemon.secondaryType}
                            title={pokemon.secondaryType}
                        />
                    )}
                </div>
            </div>
        </div>

    );

}

