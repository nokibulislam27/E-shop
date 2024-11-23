import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    AiOutlineShoppingCart,
} from "react-icons/ai";
import {
    FaStore,
    FaRegAddressCard,
    FaRegComments
} from "react-icons/fa";
import { BiPurchaseTag } from "react-icons/bi";
import { GrOverview } from "react-icons/gr";
import useUserData from "../../hooks/useUserData";
// import useAuth from "../../hooks/useAuth";
import Logo from "../../assets/logo.png";
import { IoMdAdd, IoMdSettings } from "react-icons/io";
import { IoLogOutOutline, IoMenu } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";


import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Sidebar = () => {
    // const navigate = useNavigate();
    const userData = useUserData(); // Assuming role is part of userData
    const { logOutUser } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOutUser();  // Logs the user out
            Swal.fire({
                title: "Good job!",
                text: "Logout Successfully!",
                icon: "success"
            });
            navigate('/login');  // Redirect to home
        }
        catch (error) {
            Swal.fire({
                text: error.message,
                icon: "error"
            });
        }
    };

    // Links by role
    const linksByRole = {
        common: [{ path: "/dashboard", label: "Overview", icon: <GrOverview /> }],
        customer: [
            { path: "/dashboard/cart", label: "Cart", icon: <AiOutlineShoppingCart /> },
            { path: "/dashboard/wishlist", label: "Wishlist", icon: <FaHeart /> },
            { path: "/dashboard/purchase-history", label: "Purchase History", icon: <BiPurchaseTag /> },
        ],
        seller: [
            { path: "/dashboard/add-new-product", label: "Add New Product", icon: <IoMdAdd /> },
            { path: "/dashboard/manage-products", label: "Manage Products", icon: <IoMdSettings /> },
        ],
        admin: [
            { path: "/dashboard/manage-users", label: "User Management", icon: <FaRegAddressCard /> }
        ],
    };
    // Dynamically get links based on role
    const getRoleBasedLinks = () => {
        switch (userData?.role) {
            case "customer":
                return [...linksByRole.common, ...linksByRole.customer];
            case "seller":
                return [...linksByRole.common, ...linksByRole.seller];
            case "admin":
                return [...linksByRole.common, ...linksByRole.admin];
            default:
                return linksByRole.common; // Fallback for unauthorized users
        }
    };

    return (
        <div className="bg-base-100 flex flex-col justify-center">
            {/* Drawer */}
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">
                    {/* Mobile Toggle Button */}
                    <label
                        htmlFor="my-drawer"
                        className="btn btn-primary drawer-button text-lg lg:hidden my-4 mx-2"
                    >
                        <IoMenu size={30} />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <div className="flex flex-col justify-between h-screen bg-base-200 shadow-lg">
                        <ul className="menu p-4 w-64 text-lg space-y-2">
                            {/* Logo Section */}
                            <li className="py-4">
                                <Link to="/">
                                    <div className="flex items-center">
                                        <img
                                            src={Logo}
                                            alt="Logo"
                                            className="w-12 h-12 mr-2"
                                        />
                                        <h1 className="text-2xl font-bold text-indigo-700">
                                            Lit<i className="text-purple-500">Lounge</i>
                                        </h1>
                                    </div>
                                </Link>
                            </li>

                            {/* Sidebar Links */}
                            {getRoleBasedLinks().map((link, index) => (
                                <li
                                    key={index}
                                    className="rounded-lg hover:bg-primary hover:text-white transition"
                                >
                                    <NavLink
                                        to={link.path}
                                        end // Ensures active state only applies to exact paths
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-2 ${isActive
                                                ? "bg-primary text-white"
                                                : "text-base-content hover:text-white"
                                            }`
                                        }
                                    >
                                        {link.icon}
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        {/* Logout Button */}
                        <div className="p-4">
                            <button
                                className="btn btn-error w-full flex items-center justify-center gap-2"
                                onClick={handleLogout}
                            >
                                <IoLogOutOutline className="text-2xl" /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Sidebar;
