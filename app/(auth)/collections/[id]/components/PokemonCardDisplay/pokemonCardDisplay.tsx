"use client";

import React from "react";
import styles from "./pokemonCardDisplay.module.scss";
import { CardResponseDto } from "@/app/types/card";

interface PokemonCardDisplayProps {
    card: CardResponseDto;
}

export default function PokemonCardDisplay({ card }: PokemonCardDisplayProps) {
    return (
        <div className={styles.cardContainer}>
            <img
                src={card.imageUrl}
                alt={`Carta de ${card.name}`}
                className={styles.cardImage}
            />

            <h3 className={styles.cardName}>{card.name}</h3>
        </div>
    );
}
