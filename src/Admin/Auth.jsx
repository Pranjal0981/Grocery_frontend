import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncAdminLogin } from '../store/actions/adminAction';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const AdminLoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await dispatch(asyncAdminLogin(formData, navigate));
        } catch (err) {
            setError('Failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Email"
                            required
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            placeholder="Password"
                            required
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-2 right-0 px-3 py-7 text-gray-600"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? < FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 rounded focus:outline-none ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'} transition duration-200`}
                        disabled={loading}
                    >
                        {loading ? 'Signin...' : 'Signin'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/admin/register" className="text-blue-500 hover:underline">
                        Don't have an account? Register here
                    </Link>
                </div>
                <div className="mt-2 text-center">
                    <Link to="/admin/forget-password" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
};



export const AdminRegistrationForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(asyncAdminRegister(formData)); // Assuming asyncAdminRegister handles the registration logic
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Admin Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Email"
                            required
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            placeholder="Password"
                            required
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            className="absolute  inset-y-2 right-0 px-3 py-7 text-gray-600"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Already have an account? <Link to="/admin/login" className="text-blue-500 hover:underline">Login here</Link>.
                </p>
            </div>
        </div>
    );
};