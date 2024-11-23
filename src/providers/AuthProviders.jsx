import { createContext, useEffect, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    onAuthStateChanged,
    GoogleAuthProvider,
    deleteUser
} from "firebase/auth";
import axios from "axios";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create user with email and password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user with email and password
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout user
    const logOutUser = () => {
        localStorage.removeItem('access-token'); // Clear token on logout
        return signOut(auth);
    };

    // Google login
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Delete the currently logged-in user
    const deleteAUser = () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            return Promise.reject(new Error("No user is currently logged in."));
        }
        return deleteUser(currentUser);
    };

    // Monitor auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            setUser(currentUser);

            if (currentUser) {
                try {
                    // Fetch token from server
                    const response = await axios.post(
                        `${import.meta.env.VITE_SERVER_URL}/auth`,
                        { email: currentUser.email }
                    );
                    if (response.data) {
                        localStorage.setItem('access-token', response.data.token);
                    }
                } catch (error) {
                    console.error("Error fetching token:", error);
                } finally {
                    setLoading(false); // Ensure loading is updated even on error
                }
            } else {
                // No user logged in
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });

        return () => unsubscribe(); // Cleanup subscription
    }, []);

    // Context value
    const authInfo = {
        createUser,
        loginUser,
        logOutUser,
        googleLogin,
        user,
        loading,
        deleteAUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
