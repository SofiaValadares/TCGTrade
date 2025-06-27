import {CollectionPageRecordDto, getAllPageCollections} from "@/app/services/collection";
import {useQuery} from "@tanstack/react-query";
import {PageCollectionResponseDto} from "@/app/types/collection";

export const useCollectionPage = (params: CollectionPageRecordDto) => {
    return useQuery<PageCollectionResponseDto>({
        queryKey: ["collectionsPage", params],
        queryFn: () => getAllPageCollections(params),
    });
};
