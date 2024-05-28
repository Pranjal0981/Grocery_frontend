import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncSuperAdminSignIn, asyncSuperAdminSignUp } from '../store/actions/superAdminAction';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SuperAdminForm = ({ isLogin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isLogin) {
                await dispatch(asyncSuperAdminSignIn(formData, navigate));
            } else {
                await dispatch(asyncSuperAdminSignUp(formData, navigate));
            }
        } catch (err) {
            setError(`Failed to ${isLogin ? 'login' : 'register'}.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Super Admin {isLogin ? 'Login' : 'Registration'}
                </h2>
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
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                    {isLogin && (
                        <div className="mb-4 text-right">
                            <Link to="/superadmin/forget-password" className="text-blue-500 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                    )}
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 rounded focus:outline-none ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'} transition duration-200`}
                        disabled={loading}
                    >
                        {loading ? (isLogin ? 'Login...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    {isLogin ? (
                        <p className="text-gray-700">
                            Don't have an account?{' '}
                            <Link to="/superadmin/register" className="text-blue-500 hover:underline">
                                Register here
                            </Link>
                        </p>
                    ) : (
                        <p className="text-gray-700">
                            Already have an account?{' '}
                            <Link to="/superadmin/login" className="text-blue-500 hover:underline">
                                Login here
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminForm;
