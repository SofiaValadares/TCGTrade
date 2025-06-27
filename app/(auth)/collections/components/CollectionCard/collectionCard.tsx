"use client";

import React from "react";
import styles from "./collectionCard.module.scss";
import { MdCatchingPokemon } from "react-icons/md";
import { theme } from "@/app/styles/theme";
import { CollectionResponseDto } from "@/app/types/collection";
import { useRouter } from "next/navigation";

interface CollectionCardProps {
    collection: CollectionResponseDto;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
    const router = useRouter();

    const handleNavigate = () => {
        router.push(`/collections/${collection.idCollection}`);
    };

    return (
        <div
            className={styles.detailsCard}
            onClick={handleNavigate}
            style={{ cursor: 'pointer' }}
        >
            <h1>{collection.name}</h1>

            <div className={styles.imageContainer}>
                {collection.logoUrl ? (
                    <img src={collection.logoUrl} alt={collection.name} />
                ) : (
                    <MdCatchingPokemon color={theme.text.primary} size={50} />
                )}
            </div>
        </div>
    );
}
