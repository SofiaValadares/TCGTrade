import { useQuery } from "@tanstack/react-query";
import { getAllGeneration } from "../services/generation";
import {GenerationListResponseDto} from "../types/generation";

export const useGenerations = () => {
    return useQuery<GenerationListResponseDto[]>({
        queryKey: ["generations"],
        queryFn: getAllGeneration,
    });
};
