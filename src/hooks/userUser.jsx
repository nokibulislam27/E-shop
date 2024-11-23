import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/all-users`);
            return response.data;
        },
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
    return {
        data,
        refetch,
        isLoading,
        isError,
    };
};

export default useUsers;
