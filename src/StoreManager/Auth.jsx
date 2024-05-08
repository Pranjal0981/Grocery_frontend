// AdminLoginForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncStoreRegister, asyncStoreLogin } from '../store/actions/storeManagerAction';
import { Link, useNavigate } from 'react-router-dom';


export const StoreManagerLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        store: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(asyncStoreLogin(formData, navigate,store));

    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">Store Manager Login</h2>
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="store">
                        Select Store Name
                    </label>
                    <select
                        id="store"
                        name="store"
                        value={formData.store}
                        onChange={handleInputChange}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Store Name</option>
                        <option value="Minal Residency">Minal Residency</option>
                        <option value="Rohit Nagar">Rohit Nagar</option>
                        <option value="Awadhpuri">Awadhpuri</option>
                        <option value="Jhansi">Jhansi</option>
                        <option value="Katara Hills">Katara Hills</option>

                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                >
                    Login
                </button>
                <Link
                    to="/storemanager/register"
                    className="block text-center text-gray-700 text-sm mt-2 hover:underline"
                >
                    Don't have an account? Register here
                </Link>
                <Link
                    to="/admin/forget-password"
                    className="block text-center text-gray-700 text-sm mt-2 hover:underline"
                >
                    Forgot Password?
                </Link>
            </form>
        </div>
    );
};



export const StoreManagerRegister = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        store: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(asyncStoreRegister(formData)); // Assuming asyncAdminRegister handles the registration logic
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">Store Manager Registration</h2>

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

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="store">
                        Select Store Name
                    </label>
                    <select
                        id="store"
                        name="store"
                        value={formData.store}
                        onChange={handleInputChange}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Store Name</option>
                        <option value="Minal Residency">Minal Residency</option>
                        <option value="Rohit Nagar">Rohit Nagar</option>
                        <option value="Awadhpuri">Awadhpuri</option>
                        <option value="Jhansi">Jhansi</option>
                        <option value="Katara Hills">Katara Hills</option>

                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                >
                    Register
                </button>
                {/* Add login link */}
                <p className="mt-4 text-sm text-gray-600">
                    Already have an account? <Link to="/storemanager/login" className="text-blue-500">Login here</Link>.
                </p>
            </form>
        </div>
    );
}
