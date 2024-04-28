import React from 'react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <img src="https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg" className="w-[300px] h-[300px] max-w-full mb-8 rounded-lg shadow-lg" />
            <h1 className="text-4xl font-bold text-center mb-4">Oops! Page Not Found</h1>
            <p className="text-lg text-gray-300 text-center mb-4">We couldn't find the page you were looking for.</p>
            <p className="text-lg text-gray-300 text-center">It seems we've ventured into uncharted territory.</p>
        </div>
    );
}

export default NotFound;
