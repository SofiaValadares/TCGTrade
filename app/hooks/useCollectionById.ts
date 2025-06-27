import {useQuery} from "@tanstack/react-query";
import {CollectionResponseDto} from "@/app/types/collection";
import {getOneCollection} from "@/app/services/collection";

export const useCollectionById = (id: number) => {
    return useQuery<CollectionResponseDto>({
        queryKey: ["collection", id],
        queryFn: () => getOneCollection(id),
        enabled: !!id, 
    });
};
