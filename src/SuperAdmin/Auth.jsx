import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncSuperAdminSignUp,asyncSuperAdminSignIn } from '../store/actions/superAdminAction';
import { Link, useNavigate } from 'react-router-dom';
export const SuperAdminLogin = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(asyncSuperAdminSignIn(formData, navigate)); 
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">Super Admin Login</h2>
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
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4 text-right">
                    <Link to="/superadmin/forget-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                >
                    Login
                </button>
            </form>
            <div className="text-center">
                <p className="text-gray-700">Don't have an account?</p>
                <Link to="/superadmin/register" className="text-blue-500 hover:underline">Register here</Link>
            </div>
        
        </div>
    );
}

export const SuperAdminRegistrationForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(asyncSuperAdminSignUp(formData)); // Assuming asyncSuperAdminRegister handles the registration logic
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">Super Admin Registration</h2>
               
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
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                    />
                </div>
             
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                >
                    Register
                </button>
                <p className="mt-4 text-sm text-gray-600">
                    Already have an account? <Link to="/superadmin/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
}