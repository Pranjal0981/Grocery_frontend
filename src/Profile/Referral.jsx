import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateReferralCode } from '../store/actions/userAction'; // Adjust the import based on your setup

const GenerateReferralCode = () => {
    const dispatch = useDispatch();
    const { referralCode, loading, error, user } = useSelector((state) => state.user);

    const handleGenerateReferral = () => {
        dispatch(generateReferralCode(user._id));
    };

    const shareLink = `https://rgsgrocery.com?referralCode=${referralCode}`;

    const handleCopyShareLink = () => {
        navigator.clipboard.writeText(shareLink).then(() => {
            alert('Link copied to clipboard!');
        }).catch((error) => {
            console.error('Failed to copy:', error);
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Generate Referral Link
                </h2>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
                        <button
                            type="button"
                            onClick={handleGenerateReferral}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading && 'opacity-50 cursor-not-allowed'}`}
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate Referral Link'}
                        </button>
                        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                        {referralCode && (
                            <div className="text-center">
                                <button
                                    onClick={handleCopyShareLink}
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Copy Link
                                </button>
                                <div className="mt-2 text-sm text-gray-500">
                                    <p>Share this referral link:</p>
                                    <a
                                        href={shareLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block mt-1 text-indigo-600 hover:text-indigo-500"
                                    >
                                        {shareLink}
                                    </a>
                                </div>
                                <p className="mt-4 text-xs text-gray-500">
                                    Share this unique referral link with your friends to invite them to join our platform and earn rewards together!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateReferralCode;
