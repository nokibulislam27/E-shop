import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
const ProductCard = ({ product, handleAddToCart, handleAddToWishlist }) => {
    return (
        <div className="card bg-white shadow-xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
            <figure>
                <img
                    src={product.productImage}
                    alt={product.productName}
                    className="object-cover size-3/4"
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.productName}</h2>
                <p className="text-sm text-gray-600">
                    {product.productDescription.length < 40
                        ? product.productDescription
                        : `${product.productDescription.slice(0, 40)}...`}
                </p>
                <div className="mt-2 text-primary font-semibold">${product.productPrice}</div>
                <div className="card-actions justify-between mt-4">
                    <button className="btn btn-primary flex items-center gap-2" onClick={() => handleAddToCart(product._id)}>
                        <FaShoppingCart />
                        Add to Cart
                    </button>
                    <button className="btn btn-outline btn-secondary flex items-center gap-2" onClick={() => handleAddToWishlist(product._id)}>
                        <FaHeart />
                        Wishlist
                    </button>

                </div>
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline btn-neutral flex items-center gap-2 btn-wide">
                        <FaEye size={20}></FaEye>
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
