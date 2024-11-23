import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import GoogleAuth from '../../components/GoogleAuth/GoogleAuth';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const location = useLocation();
    const { loginUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);

    const handleToggleIcon = () => {
        setShowPass(!showPass);
    };

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await loginUser(email, password);
            const redirectPath = location.state?.from?.pathname || '/dashboard';
            navigate(redirectPath, { replace: true });
            Swal.fire({
                title: "Good job!",
                text: "Login Successfully!",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                text: error.message,
                icon: "error"
            });
        }
    };


    return (
        <div className="font-inter my-8  min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md">
                <div className="p-6 sm:p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        Welcome Back!
                    </h2>
                    <p className="text-center text-gray-600 mt-2">
                        Login to access your account
                    </p>
                    <form
                        className="mt-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-medium"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-600 mt-1 block">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div className="mb-6 relative">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-medium"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()[\]{};':"\\|,.<>/?]).{8,}$/i,
                                            message:
                                                'Password must be at least 8 characters long, include uppercase and lowercase letters, at least one number, and one special character (e.g., @, !, #, etc.)',
                                        },
                                    })}
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                    onClick={handleToggleIcon}
                                >
                                    {showPass ? (
                                        <IoMdEye className="text-gray-500 text-xl" />
                                    ) : (
                                        <IoMdEyeOff className="text-gray-500 text-xl" />
                                    )}
                                </div>
                            </div>
                            {errors.password && (
                                <span className="text-sm text-red-600 mt-1 block">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <div className='flex justify-center'>
                            <button
                                type="submit"
                                className="btn-warning btn btn-wide text-xl"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className='divider'>Or using</div>
                    <div className='flex items-center justify-center'>
                        <GoogleAuth></GoogleAuth>
                    </div>
                    <div className="mt-6 text-center text-gray-600">
                        <span>Don&apos;t have an account? </span>
                        <Link
                            to="/register"
                            className="text-blue-500 font-medium hover:underline"
                        >
                            Register now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
