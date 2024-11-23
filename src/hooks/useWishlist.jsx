import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useWishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch: reloadData, data: wishlist = [], isLoading } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist-items?email=${user.email}`);
            return res.data;
        }
    })
    return [wishlist, reloadData, isLoading]
};

export default useWishlist;