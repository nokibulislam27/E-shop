import { useState, useEffect } from "react";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, refetch, isLoading] = useCart();
    const navigate = useNavigate();
    const cartData = cart?.cart || []; // Ensure cartData is populated
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    // Initialize cartItems state only once when cartData changes
    const [cartItems, setCartItems] = useState([]);
    // console.log(cartData);
    // UseEffect to update cartItems when cartData changes
    useEffect(() => {
        if (cartData?.length > 0) {
            setCartItems(
                cartData.map((item) => ({
                    ...item,
                    quantity: item.quantity || 1,
                }))
            );
        }
    }, [cartData]); // Only trigger when cartData changes

    // Increase quantity
    const handleIncrease = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity: Math.min(item.quantity + 1, item.productStock), // Ensure stock limit
                    }
                    : item
            )
        );
    };

    // Decrease quantity
    const handleDecrease = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemove = async (id) => {
        try {
            const res = await axiosSecure.delete(`/cart-items/${id}?email=${user?.email}`);
            if (res.status === 200) {
                // Update local state first
                setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));

                // Refetch the data to ensure synchronization with the backend
                refetch();

                Swal.fire({
                    title: "Good job!",
                    text: "Product successfully deleted from cart!",
                    icon: "success",
                });
            } else {
                throw new Error("Failed to delete product");
            }
        } catch (error) {
            Swal.fire({
                title: "Bad job!",
                text: error.message || "Error deleting item",
                icon: "error",
            });
        }
    };


    // Calculate the total price
    const calculateTotal = () =>
        cartItems.reduce(
            (acc, item) => acc + item.productPrice * item.quantity,
            0
        );
    if (isLoading) {
        return <Loading />;
    }

    const handlePayment = async () => {
        const amountToPay = (calculateTotal() + 35).toFixed(2); // Calculate total with fees
        const email = user?.email;
        const productIds = cartData.map(product => product._id);
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Required',
                text: 'Please log in to proceed with the payment.',
            });
            return;
        }

        try {
            const response = await axiosSecure.post(`/create-payment?email=${user?.email}`, {
                productIds,
                payableAmount: amountToPay
            })

            const { transactionId, paymentTime, payableAmount } = response.data.data;
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                html: `
                    <strong>Transaction ID:</strong> ${transactionId}<br>
                    <strong>Payment Time:</strong> ${paymentTime}<br>
                    <strong>Amount Paid:</strong> $${payableAmount}
                `,
                confirmButtonText: 'OK',
            });

            refetch();
            navigate(`/dashboard/purchase-history`)
        } catch (error) {
            console.error("Payment error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Payment Failed',
                text: error.response?.data?.message || 'An error occurred while processing the payment. Please try again.',
            });
        }
    };
    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-bold mb-6 text-center text-primary">
                Shopping Cart
            </h2>

            {cartItems?.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>Your cart is empty!</p>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Cart Items Section */}
                    <div className="flex-1">
                        <div className="overflow-x-auto">
                            <table className="table w-full bg-white shadow-md rounded-lg">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Product</th>
                                        <th className="py-3 px-4 text-center">Quantity</th>
                                        <th className="py-3 px-4 text-right">Price</th>
                                        <th className="py-3 px-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-100">
                                            <td className="py-4 px-4 flex items-center gap-4">
                                                <img
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                                                />
                                                <div>
                                                    <p className="font-semibold">
                                                        {item.productName}
                                                    </p>
                                                    <p className="text-gray-500 text-sm">
                                                        ${item.productPrice} each
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleDecrease(item._id)}
                                                        disabled={item.quantity === 1}
                                                        className={`btn btn-sm ${item.quantity === 1
                                                            ? "btn-disabled"
                                                            : "btn-outline btn-primary"
                                                            }`}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-semibold text-lg">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleIncrease(item._id)}
                                                        className={`btn btn-sm btn-outline btn-primary ${item.quantity ===
                                                            item.productStock
                                                            ? "btn-disabled"
                                                            : ""
                                                            }`}
                                                        disabled={
                                                            item.quantity === item.productStock
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                $
                                                {(
                                                    item.productPrice * item.quantity
                                                ).toFixed(2)}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <button
                                                    onClick={() => handleRemove(item._id)}
                                                    className="btn btn-error btn-sm"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="w-full lg:w-1/3 bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-semibold">$20.00</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-semibold">$15.00</span>
                        </div>
                        <div className="flex justify-between py-4">
                            <span className="text-xl font-semibold">Total</span>
                            <span className="text-xl font-bold text-primary">
                                ${(calculateTotal() + 35).toFixed(2)}
                            </span>
                        </div>
                        <button className="btn btn-primary w-full mt-4" onClick={handlePayment}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
