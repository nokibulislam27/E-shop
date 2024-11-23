import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
    const { googleLogin, user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            console.log(user); // null
            const userData = { fullName: user?.displayName, email: user?.email, role: 'customer', wishlist: [], cart: [] }
            const res = await axiosPublic.post('/users', userData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Good job!",
                    text: "Account created successfully",
                    icon: "success"
                });
                navigate("/");
            }
        }

        catch (error) {
            Swal.fire({
                text: error.message,
                icon: "error"
            });
        }
    }
    return (
        <div>
            <>
                <button className="btn btn-primary btn-outline text-xl" onClick={handleGoogleLogin}>
                    <FaGoogle className="h-6 w-6 mr-2"></FaGoogle>
                    Google Login
                </button>
            </>

        </div>
    );
};

export default GoogleAuth;