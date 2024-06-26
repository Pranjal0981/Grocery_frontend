import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateReferralCode } from '../store/actions/userAction'; // Adjust the import based on your setup

const GenerateReferralCode = () => {
    const dispatch = useDispatch();
    const { referralCode, loading, error, user } = useSelector((state) => state.user);

    const handleGenerateReferral = () => {
        dispatch(generateReferralCode(user._id));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode).then(() => {
            // Handle success
        }).catch((error) => {
            console.error('Failed to copy:', error);
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Generate Referral Code
                </h2>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
                        <button
                            type="button"
                            onClick={handleGenerateReferral}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate Referral Code'}
                        </button>
                        {error && <div className="text-red-600 text-center">{error}</div>}
                        {referralCode && (
                            <div className="text-center text-green-600">
                                Your referral code: <br />
                                <span className="text-indigo-600 hover:text-indigo-500">
                                    {referralCode}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Copy
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateReferralCode;
