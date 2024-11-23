import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]); // Store products
    const [loading, setLoading] = useState(true);  // Track loading state

    useEffect(() => {
        // Fetch products from the API
        fetch(`${import.meta.env.VITE_SERVER_URL}/products?title=&page=1&limit=4&sort=&brand=&category=`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);  // Set the products
                setLoading(false);  // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);  // Set loading to false in case of error
            });
    }, []);

    return (
        <div className="container px-6 py-8 mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Featured Products</h2>

            {/* Show loading spinner or message while loading */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin border-t-4 border-b-4 border-[#603aa8] w-12 h-12 rounded-full"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                                <img src={product?.productImage} alt={product?.productName} className="w-full h-64 object-cover rounded-t-lg" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-[#333]">{product?.productName}</h3>
                                    <p className="text-sm text-[#666] mb-3">{product.productDescription}</p>
                                    <p className="text-lg font-semibold text-[#ff6a00]">${product.productPrice}</p>
                                    <Link to={`/product/${product._id}`} className="inline-block px-6 py-2 mt-4 text-white bg-[#603aa8] rounded-lg hover:bg-[#531ca6] transition-colors duration-300">View Details</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No featured products available.</p>
                    )}
                </div>
            )}
            <Link to={`/products`}>
                <div className='flex justify-center mt-4'>
                    <button className='btn btn-primary btn-outline'>Show All Products</button>
                </div>
            </Link>
        </div>
    );
};

export default FeaturedProducts;
