// AdminLoginForm.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncStoreRegister, asyncStoreLogin } from '../store/actions/storeManagerAction';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export const StoreManagerLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        store: ""
    });

    useEffect(() => {
        // Fetch the list of stores from the JSON file
        fetch('/stores.json')
            .then((response) => response.json())
            .then((data) => setStores(data))
            .catch((error) => console.error('Error fetching stores:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { email, password, store } = formData;
        if (!email || !password || !store) {
            setError('All fields are required.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        try {
            await dispatch(asyncStoreLogin(formData, navigate));
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-50 shadow-md rounded-lg">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Store Manager Login</h2>

                {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

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
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            placeholder="Password"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-2"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="store">
                        Select Store Name
                    </label>
                    <select
                        id="store"
                        name="store"
                        value={formData.store}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                    >
                        <option value="">Select a store</option>
                        {stores.map((store, index) => (
                            <option key={index} value={store}>
                                {store}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white py-2 rounded focus:outline-none ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'} transition duration-200`}
                    disabled={loading}
                >
                    {loading ? <span>Logging in...</span> : 'Login'}
                </button>

                <div className="mt-4 flex flex-col items-center">
                    <Link to="/storemanager/register" className="text-gray-700 text-sm mt-2 hover:underline">
                        Don't have an account? Register here
                    </Link>
                    <Link to="/storemanager/forget-password" className="text-gray-700 text-sm mt-2 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export const StoreManagerRegister = () => {
    const dispatch = useDispatch();
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        // Fetch the list of stores from the JSON file
        fetch('/stores.json')
            .then((response) => response.json())
            .then((data) => setStores(data))
            .catch((error) => console.error('Error fetching stores:', error));
    }, []);

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
        setError('');
        setLoading(true);
        try {
            dispatch(asyncStoreRegister(formData));
        } catch (err) {
            setError('Failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">Store ManagerRegistration</h2>

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
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            placeholder="Password"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-2"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="store">
                        Select Store Name
                    </label>
                    <select
                        id="store"
                        name="store"
                        value={formData.store}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleInputChange}
                    >
                        <option value="">Select a store</option>
                        {stores.map((store, index) => (
                            <option key={index} value={store}>
                                {store}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white py-2 rounded focus:outline-none ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'} transition duration-200`}
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {/* Add login link */}
                <p className="mt-4 text-sm text-gray-600">
                    Already have an account? <Link to="/storemanager/login" className="text-blue-500">Login here</Link>.
                </p>
            </form>
        </div>
    );
}