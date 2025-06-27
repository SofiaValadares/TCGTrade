"use client";

import styles from './collectionDetails.module.scss';
import { CollectionResponseDto } from "@/app/types/collection";
import React, { useState } from "react";
import CollectionDetailsCard
    from "@/app/(auth)/collections/[id]/components/CollectionDetailsCard/collectionDetailsCard";
import PokemonsCardsSection from "@/app/(auth)/collections/[id]/components/PokemonsCardsSection/pokemonsCardsSection";


interface CollectionDetailsProps {
    collection: CollectionResponseDto;
    isEditing?: boolean;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
}

export default function CollectionDetails({
                                           collection,
                                           isEditing = false,
                                           onDelete,
                                           onEdit
                                       }: CollectionDetailsProps) {


    return (
        <div className={styles.collectionDetailsContainer}>
            <CollectionDetailsCard collection={collection} />
            <h1>CARDS</h1>

            <PokemonsCardsSection collection={collection.idCollection} />

        </div>
    );
}
