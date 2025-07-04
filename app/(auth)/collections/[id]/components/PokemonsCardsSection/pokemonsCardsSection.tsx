"use client";

import React from "react";
import styles from "./pokemonsCardsSection.module.scss";
import { useCard } from "@/app/hooks/useCard";
import PokemonCardDisplay from "../PokemonCardDisplay/pokemonCardDisplay";

interface PokemonsCardsSectionProps {
    collection: number;
}

export default function PokemonsCardsSection({ collection }: PokemonsCardsSectionProps) {
    const { data, isLoading, isError } = useCard(undefined, collection);

    if (isLoading) return <p className={styles.feedback}>Carregando cartas...</p>;
    if (isError || !data) return <p className={styles.feedback}>Erro ao carregar cartas.</p>;
    if (data.length === 0) return <p className={styles.feedback}>Nenhuma carta encontrada.</p>;

    return (
        <section className={styles.cardsSection}>
            <div className={styles.cardsGrid}>
                {data.map((card) => (
                    <PokemonCardDisplay key={card.idCard} card={card} />
                ))}
            </div>
        </section>
    );
}
