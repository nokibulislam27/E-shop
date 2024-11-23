import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useUserData from "../hooks/useUserData";
import useAuth from "../hooks/useAuth";

const AdminRoutes = ({ children }) => {
    const userData = useUserData();
    const { user, loading } = useAuth();
    if (loading || !userData?.role) {
        return <Loading></Loading>;
    }
    if (user && userData.role === 'admin') {
        return children;
    }
    return <Navigate to="/dashboard" replace />;
};

export default AdminRoutes;