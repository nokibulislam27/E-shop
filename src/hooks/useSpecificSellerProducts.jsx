import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUserData from "./useUserData";

const useSpecificSellerProducts = () => {
    const axiosSecure = useAxiosSecure();
    const userData = useUserData();
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['email', userData?.email], // Include email in queryKey for dependency tracking
        queryFn: async () => {
            if (!userData?.email) {
                throw new Error("Email is undefined. User might not be logged in.");
            }
            const response = await axiosSecure.get(`/my-products?email=${userData.email}`);
            return response.data;
        },
        enabled: !!userData?.email, // Disable the query until email is available
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5,
    });


    // Assuming response.data is directly an array of products
    const products = data || []; // Ensure it's an array, fallback to an empty array if not defined

    return {
        products,
        loading: isLoading,
        error: isError ? error : null,
        refetch, // For manual refetching
    };
};

export default useSpecificSellerProducts;
