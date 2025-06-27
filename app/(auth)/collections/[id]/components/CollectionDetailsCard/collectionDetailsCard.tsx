"use client";

import React, { useState } from "react";
import {CollectionResponseDto} from "@/app/types/collection";
import styles from "./collectionDetailsCard.module.scss";
import {theme} from "@/app/styles/theme";
import {MdCalendarToday, MdCatchingPokemon, MdViewModule} from "react-icons/md";

interface CollectionDetailsCardProps {
    collection: CollectionResponseDto
}



export default function CollectionDetailsCard({collection}: CollectionDetailsCardProps) {
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.detailsCard}>
            <div className={styles.nameContainer}>
                <h1>{collection.name}</h1>
                <p>{collection.series} <span>{collection.ptcgoCode}</span></p>

                <div className={styles.infosContainer}>
                    <div className={styles.infoItem}>
                        <MdCalendarToday size={18} color={theme.text.secondary}/>
                        <span>{formatDate(collection.releaseDate)}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <MdViewModule size={18} color={theme.text.secondary}/>
                        <span>{collection.totalCards} cartas</span>
                    </div>
                </div>
            </div>


            <div className={styles.imageContainer}>
                {collection.logoUrl ? (
                    <img src={collection.logoUrl} alt={collection.name}/>
                ) : (
                    <MdCatchingPokemon color={theme.text.primary} size={50}/>
                )}
            </div>
        </div>

    );

}

