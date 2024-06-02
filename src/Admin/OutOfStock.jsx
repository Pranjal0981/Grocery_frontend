import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchOutOfStock, asyncDelProduct, asyncUpdateProduct } from '../store/actions/adminAction';
import CustomSpinner from '../Spinner';
import { useNavigate } from 'react-router-dom';

const OutOfStock = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(() => {
        return parseInt(localStorage.getItem('currentPage')) || 1;
    });
    const [loading, setLoading] = useState(true);
    const { products, totalPages } = useSelector((state) => state.admin);

    useEffect(() => {
        setLoading(true);
        dispatch(asyncFetchOutOfStock(currentPage))
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch, currentPage]);

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);

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

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(asyncDelProduct(productId))
                .then(() => {
                    setLoading(true);
                    dispatch(asyncFetchOutOfStock(currentPage))
                        .then(() => setLoading(false))
                        .catch(() => setLoading(false));
                });
        }
    };

    const handleUpdateProduct = (id) => {
        navigate(`/admin/update-product/${id}`);
    };

    return (
        <>
            {loading ? (
                <CustomSpinner />
            ) : (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-semibold mb-4 text-center">Out of Stock Products</h1>
                    {products?.length > 0 ? (
                        <>
                            <p className="text-lg font-semibold mb-4 text-center">Total out-of-stock products: {products.length}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product._id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                                        <img src={product.productDetails?.image?.url} alt={product.productDetails?.brand} className="w-full h-48 object-cover" />
                                        <div className="p-6">
                                            <p className="text-lg font-semibold">{product.productDetails?.brand}</p>
                                            <p className="text-gray-700 mb-4">{product.productDetails?.description}</p>
                                            <p className="text-gray-700 mb-4">Price: {product.productDetails?.sellingPrice}</p>
                                            <p className="text-gray-700 mb-4">Store Name: {product.storeName}</p>
                                            <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
                                            <button onClick={() => handleDeleteProduct(product?._id)} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
                                            <button onClick={() => handleUpdateProduct(product?.productId)} className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2">&lt;</button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageClick(index + 1)}
                                        className={`bg-blue-500 text-white px-4 py-2 rounded-full mx-1 focus:outline-none ${currentPage === index + 1 ? 'bg-blue-700' : ''}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-blue-500 text-white px-4 py-2 rounded-full ml-2">&gt;</button>
                            </div>
                        </>
                    ) : (
                        <p className="text-lg font-semibold text-center">No out-of-stock products found.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default OutOfStock;
