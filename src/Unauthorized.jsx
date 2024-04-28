import React from 'react';

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h2 className="text-4xl font-bold mb-4">Access Denied</h2>
            <p className="text-lg mb-8">Oops! Looks like you don't have permission to view this page.</p>
            {/* You can add additional elements or styling as needed */}
        </div>
    );
};

export default Unauthorized;
