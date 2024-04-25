import React from 'react';

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h2>
            <p className="text-lg text-gray-700 mb-8">You are not authorized to access this page.</p>
            {/* You can add additional elements or styling as needed */}
        </div>
    );
};

export default Unauthorized;
