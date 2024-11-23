import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import GoogleAuth from '../../components/GoogleAuth/GoogleAuth';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
const Register = () => {
    const { createUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const handleToggleIcon = () => {
        setShowPass(!showPass);
    };
    const handleToggleConfirmPassIcon = () => {
        setShowConfirmPass(!showConfirmPass);
    }
    const onSubmit = async (data) => {
        try {
            const { fullName, email, role } = data;
            const status = role === "customer" ? "approved" : "pending";
            const userData = {
                fullName,
                email,
                role,
                status,
                ...(role === "customer" && { wishlist: [], cart: [] })  // Spread operator to conditionally add wishlist and cart
            };
            await createUser(email, password);
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
    };
    const password = watch('password');
    return (
        <div className="font-inter  min-h-screen flex items-center justify-center px-4 my-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md">
                <div className="p-6 sm:p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        Create an Account
                    </h2>
                    <p className="text-center text-gray-600 mt-2">
                        Register to get started
                    </p>
                    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Full Name */}
                        <div className="mb-4">
                            <label
                                htmlFor="fullName"
                                className="block text-gray-700 font-medium"
                            >
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                {...register('fullName', {
                                    required: 'Full Name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Full Name must be at least 3 characters',
                                    },
                                })}
                            />
                            {errors.fullName && (
                                <span className="text-sm text-red-600 mt-1 block">
                                    {errors.fullName.message}
                                </span>
                            )}
                        </div>

                        {/* Email */}
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
                        {/* Password */}
                        <div className="mb-4 relative">
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
                        {/* Confirm Password */}
                        <div className="mb-4 relative">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-medium"
                            >
                                Confirm
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPass ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: (value) =>
                                            value === password || 'Passwords do not match',
                                    })}
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                    onClick={handleToggleConfirmPassIcon}
                                >
                                    {showConfirmPass ? (
                                        <IoMdEye className="text-gray-500 text-xl" />
                                    ) : (
                                        <IoMdEyeOff className="text-gray-500 text-xl" />
                                    )}
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <span className="text-sm text-red-600 mt-1 block">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>
                        {/* Role */}
                        <div className="mb-4">
                            <label
                                htmlFor="role"
                                className="block text-gray-700 font-medium"
                            >
                                Role
                            </label>
                            <select
                                id="role"
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                {...register('role', {
                                    required: 'Role is required',
                                })}
                            >
                                <option value="">Select a role</option>
                                <option value="customer">Customer</option>
                                <option value="seller">Seller</option>
                            </select>
                            {errors.role && (
                                <span className="text-sm text-red-600 mt-1 block">
                                    {errors.role.message}
                                </span>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="btn-warning btn btn-wide text-xl"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <div className='divider'>Or using</div>
                    <div className='flex items-center justify-center'>
                        <GoogleAuth></GoogleAuth>
                    </div>
                    <div className="mt-6 text-center text-gray-600">
                        <span>Already have an account? </span>
                        <Link
                            to="/login"
                            className="text-blue-500 font-medium hover:underline"
                        >
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
