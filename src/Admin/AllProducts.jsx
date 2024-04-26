import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { asyncDelProduct, asyncFetchAllProducts } from "../store/actions/adminAction";
import { useNavigate } from 'react-router-dom';
import CustomSpinner from "../Spinner"; // Import your spinner component here

const AllProducts = () => {
    const dispatch = useDispatch();
    const { product, totalPages, loading } = useSelector((state) => state.product); // Add loading state
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('brand'); // Default search type

    useEffect(() => {
        dispatch(asyncFetchAllProducts(currentPage, searchTerm, searchType));
    }, [currentPage, searchTerm, searchType, dispatch]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async(id) => {
       await dispatch(asyncDelProduct(id));
    };

    const handleUpdate = (id) => {
        navigate(`/admin/updateproduct/${id}`);
    };

    const handleSearch = () => {
        dispatch(asyncFetchAllProducts(currentPage, searchTerm, searchType));
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>
            <div className="flex flex-col sm:flex-row mb-4">
                <input
                    type="text"
                    placeholder="Search term"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded-l mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="px-4 py-2 border rounded-r bg-white mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
                >
                    <option value="brand">Brand</option>
                    <option value="store">Store</option>
                    <option value="productCode">Product Code</option>
                </select>
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto"
                >
                    Search
                </button>
            </div>

            {loading ? (
                <CustomSpinner /> // Render spinner when loading is true
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {Array.isArray(product) && product.map((prod) => (
                        <div key={prod._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={prod.image.url} alt={prod.brand} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{prod.brand}</h2>
                                <p className="text-gray-600 mb-2">Category: {prod.category}</p>
                                <p className="text-gray-600 mb-2">Price: ${prod.price}</p>
                                <p className="text-gray-600 mb-2">Stock: {prod.stock}</p>
                                <div className="flex justify-between">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleUpdate(prod._id)}>Update</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleDelete(prod._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex justify-center mt-8">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-4 py-2 rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
