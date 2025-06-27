"use client";

import React, { useState } from "react";
import styles from "./pokemonsCardsSection.module.scss";
import { useCardPage } from "@/app/hooks/useCardPage";
import Pagination from "@/app/components/Pagination/Pagination";
import PokemonCardDisplay from "@/app/(auth)/pokemons/[id]/components/PokemonCardDisplay/pokemonCardDisplay";

interface PokemonsCardsSectionProps {
    idPokemon: number;
}

export default function PokemonsCardsSection({ idPokemon }: PokemonsCardsSectionProps) {
    const [page, setPage] = useState(0);
    const size = 5;

    const { data, isLoading, isError } = useCardPage({
        page,
        size,
        idPokemon,
    });

    if (isLoading) return <p className={styles.feedback}>Carregando cartas...</p>;
    if (isError || !data) return <p className={styles.feedback}>Erro ao carregar cartas.</p>;
    if (data.content.length === 0) return <p className={styles.feedback}>Nenhuma carta encontrada.</p>;

    return (
        <section className={styles.cardsSection}>
            <div className={styles.cardsGrid}>
                {data.content.map((card) => (
                    <PokemonCardDisplay key={card.idCard} card={card} />
                ))}
            </div>

            <Pagination
                currentPage={data.number}
                totalPages={data.totalPages}
                setPage={setPage}
            />
        </section>
    );
}
