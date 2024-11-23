import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = ({ search, page, sort, brand, category }) => {
    const axiosPublic = useAxiosPublic();
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['products', 'productBrand', 'productCategory', 'totalProducts', { search, page, sort, brand, category }],
        queryFn: async () => {
            const response = await axiosPublic.get(`/products`, {
                params: { search, page, sort, brand, category, limit: 6 }
            });
            return response.data || {}; // Ensure it always returns an object
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

export default useProducts;
