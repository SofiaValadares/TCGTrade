import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/user";
import { UserRoleResponseDto } from "../types/user";

export const useCurrentUser = () => {
    return useQuery<UserRoleResponseDto>({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
    });
};
