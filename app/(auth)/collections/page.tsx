"use client";

import React, { useEffect, useState } from "react";
import style from "./collections.module.scss"
import {useCollectionPage} from "@/app/hooks/useCollectionPage";
import styles from "@/app/(auth)/home/components/GenerationSection/generationSection.module.scss";
import Pagination from "@/app/components/Pagination";
import CollectionCard from "@/app/(auth)/collections/components/CollectionCard/collectionCard";

export default function CollectionsPage(){
    const [page, setPage] = useState(0);

    const { data, isLoading } = useCollectionPage({
        page,
        size: 10,
        sort: "releaseDate",
        order: "desc",
    });

    const items = data?.content ?? [];
    const currentPage = data?.number ?? 0;
    const totalPages = data?.totalPages ?? 1;


    return (
        <div className={style.collections}>
                {isLoading ? (
                    <p>Carregando coleções...</p>
                ) : items.length > 0 ? (
                    items.map(collection => (
                        <CollectionCard
                        collection={collection}
                        key={collection.idCollection}
                        />
                    ))
                ) : (
                    <p>Nenhuma coleção encontrado.</p>
                )}


            <div className={styles.pagination}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </div>
        </div>
    )
}
