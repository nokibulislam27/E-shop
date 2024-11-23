import useUserData from "../../../hooks/useUserData";
import Admin from "./Admin";


const Overview = () => {
    const userData = useUserData();

    const getOverviewContent = () => {
        switch (userData?.role) {
            case "customer":
                return (
                    <div className="card bg-base-100 shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">
                            Welcome, {userData.fullName}!
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Explore your shopping cart, wishlist, and purchase history.
                        </p>
                        <div className="stats shadow">
                            <div className="stat">
                                <div className="stat-title">Cart Items</div>
                                <div className="stat-value text-primary">{userData.cart.length}</div>
                                <div className="stat-desc">Ready to checkout?</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Wishlist Items</div>
                                <div className="stat-value text-secondary">{userData.wishlist.length}</div>
                                <div className="stat-desc">Don't miss out!</div>
                            </div>
                        </div>
                    </div>
                );

            case "seller":
                return (
                    <div className="card bg-base-100 shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">
                            Welcome, {userData.fullName}!
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Manage your store, track sales, and add new products.
                        </p>
                        <div className="stats shadow">
                            <div className="stat">
                                <div className="stat-title">Total Products</div>
                                <div className="stat-value text-primary">20</div>
                                <div className="stat-desc">Active in your store</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Pending Orders</div>
                                <div className="stat-value text-secondary">5</div>
                                <div className="stat-desc">Awaiting fulfillment</div>
                            </div>
                        </div>
                    </div>
                );

            case "admin":
                return (
                    <Admin></Admin>
                );
            default:
                return (
                    <div className="card bg-base-100 shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-primary mb-4">
                            Welcome to LitLounge!
                        </h2>
                        <p className="text-gray-600">
                            Please log in or contact support if you encounter issues.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            {getOverviewContent()}
        </div>
    );
};

export default Overview;
