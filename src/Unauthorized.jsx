import React from 'react';

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h2 className="text-4xl font-bold mb-4">Access Denied</h2>
            <p className="text-lg mb-4">Oops! It looks like you don't have permission to access this page.</p>
            <p className="text-lg mb-4">Please reach out to the site administrator for assistance.</p>
            <p className="text-lg">Thank you!</p>
        </div>
    );
};

export default Unauthorized;
