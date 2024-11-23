import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import useUserData from "../../hooks/useUserData";

const ProductDetails = () => {
    const product = useLoaderData();
    const userData = useUserData();
    return (
        <div className="max-w-7xl mx-auto p-8 bg-gray-50">
            {/* Product Title */}
            <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-8">{product.productName}</h1>

            {/* Product Card */}
            <div className="lg:flex justify-center items-center bg-white shadow-xl rounded-xl p-8 mb-12">
                {/* Left Side - Product Image */}
                <div className="lg:w-1/2 mb-6 lg:mb-0 flex justify-center">
                    <img
                        src={product.productImage}
                        alt={product.productName}
                        className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
                    />
                </div>

                {/* Right Side - Product Details */}
                <div className="lg:w-1/2 lg:pl-8 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
                    <p className="text-gray-700 leading-relaxed">{product.productDescription}</p>

                    <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold text-indigo-600">${product.productPrice.toFixed(2)}</span>
                        <span className="text-lg text-gray-600">Stock: {product.productStock}</span>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-700">Brand: <span className="font-normal text-gray-500">{product.productBrand}</span></h3>
                        <h3 className="text-lg font-semibold text-gray-700">Category: <span className="font-normal text-gray-500">{product.productCategory}</span></h3>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button className="btn btn-primary  text-lg" disabled={userData?.role === 'seller'}><FaShoppingCart></FaShoppingCart>Add to Cart</button>
                        <button className="btn btn-warning  text-lg" disabled={userData?.role === 'seller'}><FaHeart />Add to Wishlist</button>
                    </div>
                </div>
            </div>

            {/* Comment Section */}
            <div className="mt-12 bg-white shadow-xl rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Comments</h2>

                {/* Comment Form */}
                <div className="mb-6">
                    <textarea
                        className="textarea textarea-bordered w-full p-4 text-lg rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Write a comment..."
                    ></textarea>
                    <button className="btn btn-primary mt-4 py-2 w-full text-lg" disabled={userData?.role === 'seller'}>Post Comment</button>
                </div>

                {/* Comment List */}
                <div className="space-y-6">
                    {/* Comment Item 1 */}
                    <div className="flex items-start border-b pb-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-xl text-white font-semibold">A</span>
                        </div>
                        <div className="ml-4">
                            <span className="text-gray-800 font-semibold">Alice</span>
                            <p className="mt-2 text-gray-600">
                                This product is amazing! It really helped me with my SAT preparation. Highly recommend it!
                            </p>
                        </div>
                    </div>

                    {/* Comment Item 2 */}
                    <div className="flex items-start border-b pb-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-xl text-white font-semibold">B</span>
                        </div>
                        <div className="ml-4">
                            <span className="text-gray-800 font-semibold">Bob</span>
                            <p className="mt-2 text-gray-600">
                                Great book! The explanations are very clear and easy to understand. Worth every penny.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
