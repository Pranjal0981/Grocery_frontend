import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchOutOfStock, asyncDelProduct } from '../store/actions/adminAction';

import CustomSpinner from '../Spinner';

const OutOfStock = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true); // State to track loading status
    const { products } = useSelector((state) => state.admin);

    useEffect(() => {
        setLoading(true); // Set loading to true when fetching data
        dispatch(asyncFetchOutOfStock(currentPage))
            .then(() => setLoading(false)) // Set loading to false when data is fetched
            .catch(() => setLoading(false)); // Handle any errors while fetching data
    }, [dispatch, currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(asyncDelProduct(productId));
        }
    };

    return (
        <>

            {loading ? (
                <CustomSpinner /> // Show spinner while loading
            ) : (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-semibold mb-4 text-center">Out of Stock Products</h1>
                    {products.length > 0 ? ( // Check if products are available
                        <>
                            <p className="text-lg font-semibold mb-4 text-center">Total out-of-stock products: {products.length}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product._id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                                        <img src={product?.image?.url} alt={product?.brandName} className="w-full h-48 object-cover" />
                                        <div className="p-6">
                                            <p className="text-lg font-semibold">{product.brandName}</p>
                                            <p className="text-gray-700 mb-4">{product.description}</p>
                                            <p className="text-gray-700 mb-4">Price: {product.price}</p>
                                            <p className="text-gray-700 mb-4">Product ID: {product._id}</p>
                                            <button onClick={() => handleDeleteProduct(product?._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Previous</button>
                                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
                            </div>
                        </>
                    ) : (
                        <p className="text-lg font-semibold text-center">No out-of-stock products found.</p> // Show message if no products are found
                    )}
                </div>
            )}
        </>
    );
};

export default OutOfStock;
