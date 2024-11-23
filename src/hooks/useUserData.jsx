import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserData = () => {
    const { user, loading } = useAuth();
    const [userData, setUserData] = useState({});
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                await axiosSecure.get(`/user?email=${user.email}`)
                    .then((res) => setUserData(res.data));
            }
            catch (error) {
                console.log(error);
            }
        }
        if (user?.email && !loading) {
            fetchUserData();
        }
    }, [user, loading, axiosSecure])
    return userData;
};

export default useUserData;