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
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await dispatch(asyncResetPassword(id, password)); // Pass id and password separately
            setMessage('Password reset successfully!');
        } catch (error) {
            setMessage('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-center">Reset Password</h2>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        New Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none"
                    onClick={handleResetPassword}
                >
                    Reset Password
                </button>

                <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
            </div>
        </div>
    );
};


export const ResetAdminPassword=()=>{
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await dispatch(asyncAdminResetPassword(id, password)); // Pass id and password separately
            setMessage('Password reset successfully!');
        } catch (error) {
            setMessage('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-center">Reset Admin Password</h2>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        New Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none"
                    onClick={handleResetPassword}
                >
                    Reset Password
                </button>

                <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
            </div>
        </div>
    )
}


export const ResetSuperAdminPassword = () => {
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await dispatch(asyncSuperAdminResetPassword(id, password)); // Pass id and password separately
            setMessage('Password reset successfully!');
        } catch (error) {
            setMessage('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-center">Reset Super Admin Password</h2>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        New Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none"
                    onClick={handleResetPassword}
                >
                    Reset Password
                </button>

                <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
            </div>
        </div>
    )
}


export const ResetStoreManagerPassword= () => {
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await dispatch(asyncStoreManagerPassword(id, password)); // Pass id and password separately
            setMessage('Password reset successfully!');
        } catch (error) {
            setMessage('Error resetting password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
                <h2 className="text-3xl font-semibold mb-4 text-center">Reset Store Manager Password</h2>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        New Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none"
                    onClick={handleResetPassword}
                >
                    Reset Password
                </button>

                <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
            </div>
        </div>
    )
}

