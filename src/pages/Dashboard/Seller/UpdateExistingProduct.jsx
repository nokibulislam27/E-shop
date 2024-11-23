import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AiOutlineCloudUpload } from "react-icons/ai";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import useSpecificSellerProducts from "../../../hooks/useSpecificSellerProducts";

const UpdateExistingProduct = () => {
    const product = useLoaderData();
    const { refetch } = useSpecificSellerProducts();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: { ...product }, // Pre-fill form fields with product data
    });

    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const updatedProductData = {
            ...data,
        };

        setLoading(true);
        try {
            const res = await axiosSecure.put(`/products/${product._id}`, updatedProductData);
            if (res.data) {
                setTimeout(() => {
                    setLoading(false);
                    Swal.fire({
                        title: "Success!",
                        text: "Product updated successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    reset();
                    refetch();
                    navigate('/dashboard/manage-products');
                }, 2000);
            }
        } catch (error) {
            setLoading(false);
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="max-w-4xl my-4 mx-auto bg-white p-12 rounded-xl shadow-lg space-y-6">
            <h1 className="text-3xl font-semibold text-center text-indigo-600">Update Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Product Name */}
                <div className="flex flex-col">
                    <label htmlFor="productName" className="text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        placeholder="Enter the product name"
                        className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...register("productName", { required: "Product name is required" })}
                    />
                    {errors.productName && (
                        <span className="text-red-500 text-sm mt-2">{errors.productName.message}</span>
                    )}
                </div>

                {/* Product Description */}
                <div className="flex flex-col">
                    <label htmlFor="productDescription" className="text-sm font-medium text-gray-700 mb-2">Product Description</label>
                    <textarea
                        id="productDescription"
                        placeholder="Enter the product description"
                        className="textarea textarea-bordered w-full py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...register("productDescription", { required: "Product description is required" })}
                    />
                    {errors.productDescription && (
                        <span className="text-red-500 text-sm mt-2">{errors.productDescription.message}</span>
                    )}
                </div>

                {/* Product Price */}
                <div className="flex flex-col">
                    <label htmlFor="productPrice" className="text-sm font-medium text-gray-700 mb-2">Product Price</label>
                    <input
                        type="number"
                        id="productPrice"
                        placeholder="Enter the product price"
                        className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...register("productPrice", {
                            required: "Product price is required",
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: "Price must be a positive number",
                            },
                        })}
                    />
                    {errors.productPrice && (
                        <span className="text-red-500 text-sm mt-2">{errors.productPrice.message}</span>
                    )}
                </div>

                {/* Product Stock */}
                <div className="flex flex-col">
                    <label htmlFor="productStock" className="text-sm font-medium text-gray-700 mb-2">Product Stock</label>
                    <input
                        type="number"
                        id="productStock"
                        placeholder="Enter the product stock"
                        className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...register("productStock", {
                            required: "Product stock is required",
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "Stock must be at least 1",
                            },
                        })}
                    />
                    {errors.productStock && (
                        <span className="text-red-500 text-sm mt-2">{errors.productStock.message}</span>
                    )}
                </div>

                {/* Product Brand */}
                <div className="flex flex-col">
                    <label htmlFor="productBrand" className="text-sm font-medium text-gray-700 mb-2">Product Brand</label>
                    <input
                        type="text"
                        id="productBrand"
                        placeholder="Enter the product brand"
                        className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...register("productBrand", { required: "Product brand is required" })}
                    />
                    {errors.productBrand && (
                        <span className="text-red-500 text-sm mt-2">{errors.productBrand.message}</span>
                    )}
                </div>

                {/* Product Category */}
                <div className="flex flex-col">
                    <label htmlFor="productCategory" className="text-sm font-medium text-gray-700 mb-2">Product Category</label>
                    <input
                        type="text"
                        id="productCategory"
                        placeholder="Enter the product category"
                        className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...register("productCategory", { required: "Product category is required" })}
                    />
                    {errors.productCategory && (
                        <span className="text-red-500 text-sm mt-2">{errors.productCategory.message}</span>
                    )}
                </div>

                {/* Product Image URL */}
                <div className="flex flex-col">
                    <label htmlFor="productImage" className="text-sm font-medium text-gray-700 mb-2">Product Image URL</label>
                    <input
                        type="text"
                        id="productImage"
                        placeholder="Enter the product image URL"
                        className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...register("productImage", { required: "Product image URL is required" })}
                    />
                    {errors.productImage && (
                        <span className="text-red-500 text-sm mt-2">{errors.productImage.message}</span>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="btn btn-primary w-full py-3 px-4 rounded-lg bg-indigo-600 text-white text-lg font-medium transition-all duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? (
                            <span>Loading...</span>
                        ) : (
                            <>
                                <AiOutlineCloudUpload className="mr-2" /> Update Product
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateExistingProduct;
