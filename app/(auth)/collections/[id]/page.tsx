'use client';

import { useParams } from 'next/navigation';
import { useCollectionById } from "@/app/hooks/useCollectionById";
import CollectionDetails from "@/app/(auth)/collections/[id]/CollectionDetails";

export default function CollectionDetailPage() {
    const { id } = useParams();

    const { data: collection, isLoading, isError } = useCollectionById(Number(id));

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (isError || !collection) {
        return <p>Erro ao carregar a coleção.</p>;
    }

    return <CollectionDetails collection={collection} />;

}
