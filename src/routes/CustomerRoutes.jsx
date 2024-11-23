import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useUserData from "../hooks/useUserData";
import useAuth from "../hooks/useAuth";

const CustomerRoutes = ({ children }) => {
    const userData = useUserData();
    const { user, loading } = useAuth();
    if (loading || !userData?.role) {
        return <Loading></Loading>;
    }
    if (user && userData.role === 'customer') {
        return children;
    }
    return <Navigate to="/dashboard" replace />;
};

export default CustomerRoutes;