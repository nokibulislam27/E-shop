import { Navigate } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const SellerRoutes = ({ children }) => {
    const userData = useUserData();
    const { user, loading } = useAuth();
    if (loading || !userData?.role) {
        return <Loading></Loading>;
    }
    if (user && userData.role === 'seller') {
        return children;
    }
    return <Navigate to="/dashboard" replace />;
};

export default SellerRoutes;