import {getAllCollections} from "@/app/services/collection";
import {useQuery} from "@tanstack/react-query";
import {CollectionResponseDto} from "@/app/types/collection";

export const useCollections = () => {
    return useQuery<CollectionResponseDto[]>({
        queryKey: ["collections"],
        queryFn: getAllCollections,
    });
};
