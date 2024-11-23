import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Dashboard from "../layouts/Dashboard";
import Overview from "../pages/Dashboard/Common/Overview";
import PrivateRoutes from "./PrivateRoutes";
import AddNewProduct from "../pages/Dashboard/Seller/AddNewProduct";
import SellerRoutes from "./SellerRoutes";
import ManageProducts from "../pages/Dashboard/Seller/ManageProducts";
import ProductDetails from "../components/Home/ProductDetails";
import UpdateExistingProduct from "../pages/Dashboard/Seller/UpdateExistingProduct";
import Products from "../pages/Products/Products";
import ManageUser from "../pages/Dashboard/Admin/ManageUser";
import AdminRoutes from "./AdminRoutes";
import CustomerRoutes from "./CustomerRoutes";
import Cart from "../pages/Dashboard/Customer/Cart";
import Wishlist from "../pages/Dashboard/Customer/Wishlist";
import PurchaseHistory from "../pages/Dashboard/Customer/PurchaseHistory";
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/about',
                element: <About></About>,
            },
            {
                path: '/contact-us',
                element: <Contact></Contact>
            },
            {
                path: '/products',
                element: <Products></Products>
            },
            {
                path: '/product/:id',
                element: <PrivateRoutes><ProductDetails></ProductDetails></PrivateRoutes>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_URL}/products/${params.id}`)
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                index: true,
                element: <Overview></Overview>
            },
            // seller routes
            {
                path: 'add-new-product',
                element: <SellerRoutes><AddNewProduct></AddNewProduct></SellerRoutes>
            },
            {
                path: 'manage-products',
                element: <SellerRoutes><ManageProducts></ManageProducts></SellerRoutes>
            },
            {
                path: 'edit-product/:id',
                element: <SellerRoutes><UpdateExistingProduct></UpdateExistingProduct></SellerRoutes>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_URL}/products/${params.id}`)
            },
            // routes for admin
            {
                path: 'manage-users',
                element: <AdminRoutes><ManageUser></ManageUser></AdminRoutes>
            },
            // customer routes
            {
                path: 'cart',
                element: <CustomerRoutes><Cart></Cart></CustomerRoutes>
            },
            {
                path: 'wishlist',
                element: <CustomerRoutes><Wishlist></Wishlist></CustomerRoutes>
            },
            {
                path: 'purchase-history',
                element: <CustomerRoutes><PurchaseHistory></PurchaseHistory></CustomerRoutes>
            }
        ]
    }
])
export default router;