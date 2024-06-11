import React from 'react';

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-500 to-yellow-500 text-white p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center text-gray-900 max-w-md">
                <h2 className="text-4xl font-bold mb-4">Uh-oh! Access Denied</h2>
                <p className="text-lg mb-4">It looks like you don't have the required permissions to view this page.</p>
                <p className="text-lg mb-4">If you think this is a mistake, please reach out to our support team.</p>
                <p className="text-lg mb-4">We're here to help!</p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;
