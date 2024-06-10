import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { asyncResetPassword } from '../store/actions/userAction';
import { asyncAdminResetPassword } from '../store/actions/adminAction';
import { asyncSuperAdminResetPassword } from '../store/actions/superAdminAction';
import { asyncStoreManagerPassword } from '../store/actions/storeManagerAction'
export const ResetPassword = () => {
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);
        try {
            await dispatch(asyncResetPassword(id, password));
            setLoading(false);
            toast.success('Password reset successfully!');
            setPassword(''); // Clear the input field
        } catch (error) {
            setLoading(false);
            toast.error('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-center text-gray-900">Reset Password</h2>

                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={password}
                            placeholder='Minimum 8 characters'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export const ResetAdminPassword=()=>{
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);
        try {
            await dispatch(asyncAdminResetPassword(id, password));
            setLoading(false);
            toast.success('Password reset successfully!');
            setPassword(''); // Clear the input field
        } catch (error) {
            setLoading(false);
            toast.error('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-center text-gray-900">Reset Admin Password</h2>

                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={password}
                            placeholder='Minimum 8 characters'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
                )}
            </div>
        </div>
    
    )
}


export const ResetSuperAdminPassword = () => {
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);
        try {
            await dispatch(asyncSuperAdminResetPassword(id, password));
            setLoading(false);
            toast.success('Password reset successfully!');
            setPassword(''); // Clear the input field
        } catch (error) {
            setLoading(false);
            toast.error('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-center text-gray-900">Reset Super Admin Password</h2>

                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={password}
                            placeholder='Minimum 8 characters'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};


export const ResetStoreManagerPassword= () => {
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);
        try {
            await dispatch(asyncStoreManagerPassword(id, password));
            setLoading(false);
            toast.success('Password reset successfully!');
            setPassword(''); // Clear the input field
        } catch (error) {
            setLoading(false);
            toast.error('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-center text-gray-900">Reset Store Manager Password</h2>

                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={password}
                            placeholder='Minimum 8 characters'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
    }