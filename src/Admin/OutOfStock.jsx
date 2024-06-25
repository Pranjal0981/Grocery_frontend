import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncDelProduct, asyncFetchOutOfStock } from '../store/actions/adminAction';
import { useNavigate } from 'react-router-dom';

const OutOfStockPage = () => {
    const dispatch = useDispatch();
    const { duplicateProductsByName, duplicateProductsByCode, invalidStockOrMissingStoreNameProducts } = useSelector((state) => state.admin);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(asyncFetchOutOfStock(1)); // Fetch out-of-stock products for page 1
    }, [dispatch]);

    const handleUpdate = (productId) => {
        console.log(`Update product with ID ${productId}`);
        navigate(`/admin/update-product/${productId}`);
    };
    const handleDelete = async (id) => {
        await dispatch(asyncDelProduct(id, store));
    };

    // Filter products based on search term
    const filteredProductsByName = duplicateProductsByName.filter((group) =>
        group.products.some((product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const filteredProductsByCode = duplicateProductsByCode.filter((group) =>
        group.products.some((product) =>
            product.productCode.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const filteredInvalidProducts = invalidStockOrMissingStoreNameProducts.filter((product) =>
        product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-8">Out of Stock Products</h2>

            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Duplicate Products by Name */}
            {/* <section className="mb-12">
                <h3 className="text-lg font-semibold mb-4">Duplicate Products by Name</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProductsByName.map((group) => (
                        <div key={group._id.productName} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {group.products.map((product) => (
                                <div key={product._id} className="flex flex-col md:flex-row md:items-start p-4">
                                    <div className="md:w-1/3 md:mr-4 relative pb-2/3">
                                        <img
                                            src={product.image?.url || 'https://via.placeholder.com/300'}
                                            alt={product.productName}
                                            className=" inset-0 w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="md:w-2/3 mt-4 md:mt-0">
                                        <h4 className="text-lg font-semibold mb-2">{product.productName}</h4>
                                        <h4 className="text-lg font-semibold mb-2">{product.size}</h4>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => handleUpdate(product._id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Update
                                            </button>
                                           
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section> */}

            {/* Duplicate Products by Code */}
            <section className="mb-12">
                <h3 className="text-lg font-semibold mb-4">Duplicate Products by Code</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProductsByCode.map((group) => (
                        <div key={group._id.productCode} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {group.products.map((product) => (
                                <div key={product._id} className="flex flex-col md:flex-row md:items-start p-4">
                                    <div className="md:w-1/3 md:mr-4 relative pb-2/3">
                                        <img
                                            src={product.image?.url || 'https://via.placeholder.com/300'}
                                            alt={product.productCode}
                                            className=" inset-0 w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="md:w-2/3 mt-4 md:mt-0">
                                        <h4 className="text-lg font-semibold mb-2">{product?.size}</h4>

                                        <h4 className="text-lg font-semibold mb-2">{product.productCode}</h4>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => handleUpdate(product._id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Update
                                            </button>
                                           
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* Invalid Stock or Missing Store Name Products */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Invalid Stock or Missing Store Name Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInvalidProducts.map((product) => (
                        <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="flex flex-col md:flex-row md:items-start p-4">
                                <div className="md:w-1/3 md:mr-4 relative pb-2/3">
                                    <img
                                        src={product?.image?.url || 'https://via.placeholder.com/300'}
                                        alt={product.productName}
                                        className=" inset-0 w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="md:w-2/3 mt-4 md:mt-0">
                                    <h4 className="text-lg font-semibold mb-2">{product.productName}</h4>
                                    <p className="mb-2">Stock: {product.stock}, Store: {product.storeName}</p>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleUpdate(product._id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Update
                                        </button>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pagination can be implemented if totalPages is used */}
        </div>
    );
};

export default OutOfStockPage;
