import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import useWishlist from "../../../hooks/useWishlist";
import useUserData from "../../../hooks/useUserData";

const Wishlist = () => {
    // const [wishlist, setWishlist] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const userData = useUserData();
    const axiosSecure = useAxiosSecure();
    const [wishlist, reloadData, isLoading] = useWishlist();
    const wishlistData = wishlist?.wishlist || [];
    // Remove an item from the wishlist
    const handleRemove = async (id) => {
        try {
            const res = await axiosSecure.delete(`/wishlist-items/${id}?email=${userData?.email}`);
            if (res.status === 200) {
                reloadData();
                Swal.fire({
                    title: "Success",
                    text: "Item removed from wishlist!",
                    icon: "success",
                });
            } else {
                throw new Error("Failed to remove item");
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || error.message || "Error removing item",
                icon: "error",
            });
        }
    };

    // Add an item to the cart from the wishlist
    const handleAddToCart = async (item) => {
        try {
            // Ensure the product id and email are passed correctly
            const res = await axiosSecure.patch(`/cart?id=${item._id}&email=${userData?.email}`);
            if (res.status === 200) {
                reloadData();
                Swal.fire({
                    title: "Added to Cart",
                    text: `${item.productName} has been added to your cart.`,
                    icon: "success",
                });
            } else {
                throw new Error("Failed to add to cart");
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || error.message || "Error adding item to cart",
                icon: "error",
            });
        }
    };
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-bold mb-6 text-center text-primary">Wishlist</h2>

            {wishlistData?.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>Your wishlist is empty!</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left">Product</th>
                                <th className="py-3 px-4 text-right">Price</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlistData.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-100">
                                    <td className="py-4 px-4 flex items-center gap-4">
                                        <img
                                            src={item.productImage}
                                            alt={item.productName}
                                            className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                                        />
                                        <div>
                                            <p className="font-semibold">{item.productName}</p>
                                            <p className="text-gray-500 text-sm">${item.productPrice}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        ${item.productPrice.toFixed(2)}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => handleRemove(item._id)}
                                            className="btn btn-error btn-sm ml-2"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
