import { useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import useSpecificSellerProducts from "../../../hooks/useSpecificSellerProducts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageProducts = () => {
    const { products, loading, error, refetch } = useSpecificSellerProducts();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const axiosSecure = useAxiosSecure();

    // Sorting function for table
    const handleSort = (column) => {
        const sorted = [...filteredProducts].sort((a, b) => {
            if (a[column] < b[column]) return -1;
            if (a[column] > b[column]) return 1;
            return 0;
        });
        setFilteredProducts(sorted);
    };

    // Deleting a product
    const handleDelete = (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Call the deleteProduct function to send DELETE request
                    await deleteProduct(productId);
                    Swal.fire("Deleted!", "The product has been deleted.", "success");
                    refetch();
                } catch (error) {
                    Swal.fire("Error", error);
                }
            }
        });
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-2xl font-semibold text-indigo-600">Loading...</div>
        </div>
    );
    if (error) return <div>Error loading products.</div>;
    // Function for deleting a product
    const deleteProduct = async (productId) => {
        try {
            const res = await axiosSecure.delete(`/products/${productId}`);
            if (res.status === 200) {
                console.log('Product deleted successfully');
            } else {
                throw new Error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error; // Rethrow the error to be caught in the handleDelete function
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen font-inter">
            <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
                Manage Your Products
            </h1>
            <h1 className="text-center text-2xl my-10">You have <u>{products.length}</u> Products</h1>

            <div className="overflow-x-scroll shadow-lg rounded-lg bg-white">
                <table className="min-w-full mx-auto border-collapse">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th
                                className="py-3 px-6 text-sm font-medium cursor-pointer hover:bg-indigo-700"
                                onClick={() => handleSort("productName")}
                            >
                                Product Sr.
                            </th>
                            <th
                                className="py-3 px-6 text-sm font-medium cursor-pointer hover:bg-indigo-700"
                                onClick={() => handleSort("productName")}
                            >
                                Product Name
                            </th>
                            <th
                                className="py-3 px-6 text-sm font-medium cursor-pointer hover:bg-indigo-700"
                                onClick={() => handleSort("productCategory")}
                            >
                                Category
                            </th>
                            <th
                                className="py-3 px-6 text-sm font-medium cursor-pointer hover:bg-indigo-700"
                                onClick={() => handleSort("productPrice")}
                            >
                                Price
                            </th>
                            <th
                                className="py-3 px-6 text-sm font-medium cursor-pointer hover:bg-indigo-700"
                                onClick={() => handleSort("productStock")}
                            >
                                Stock
                            </th>
                            <th className="py-3 px-6 text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id} className="border-b text-center hover:bg-gray-50">
                                <td className="py-4 px-6 text-sm text-gray-800">{index + 1}</td>
                                <td className="py-4 px-6 text-sm text-gray-800">{product.productName}</td>
                                <td className="py-4 px-6 text-sm text-gray-600">{product.productCategory}</td>
                                <td className="py-4 px-6 text-sm text-gray-600">${product.productPrice.toFixed(2)}</td>
                                <td className="py-4 px-6 text-sm text-gray-600">{product.productStock}</td>
                                <td className="py-4 px-6 text-sm">
                                    <Link to={`/dashboard/edit-product/${product._id}`}>
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all focus:outline-none"
                                        >
                                            <FaEdit className="inline-block mr-2" />
                                            Edit
                                        </button>
                                    </Link>
                                    <Link to={`/product/${product._id}`}>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all ml-2 focus:outline-none"
                                        >
                                            <FaEye className="inline-block mr-2" />
                                            View
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all ml-2 focus:outline-none"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        <FaTrash className="inline-block mr-2" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default ManageProducts;
