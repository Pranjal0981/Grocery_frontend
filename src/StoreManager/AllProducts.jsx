import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchAllProducts } from "../store/actions/storeManagerAction";
import { useNavigate, useParams } from 'react-router-dom';
import CustomSpinner from "../Spinner"; // Import your spinner component here

const AllProductsBystore = () => {
    const { products, totalPages } = useSelector((state) => state.admin); // Assuming your reducer provides totalPages
    const { store } = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(asyncFetchAllProducts(store, currentPage, searchQuery));
    }, [dispatch, store, currentPage, searchQuery]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        dispatch(asyncFetchAllProducts(store, 1, searchQuery));

    };

   
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <div className="container mx-auto mt-4">
                <h1 className="text-center text-2xl font-bold mb-4">{store} Store</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="border rounded px-2 py-1"
                    />
                </div>
                <table className="min-w-full bg-white border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">MRP</th>
                            <th className="py-2 px-4 border-b">Selling Price</th>
                            <th className="py-2 px-4 border-b">Stock</th>
                            <th className="py-2 px-4 border-b">Product Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product?._id}>
                                <td className="py-2 px-4 border-b">{product?.productName}</td>
                                <td className="py-2 px-4 border-b">{product?.category}</td>
                                <td className="py-2 px-4 border-b">{product?.description}</td>
                                <td className="py-2 px-4 border-b">Rs {product?.MRP}</td>
                                <td className="py-2 px-4 border-b">Rs {product?.sellingPrice}</td>
                                <td className="py-2 px-4 border-b">{product?.stock}</td>
                                <td className="py-2 px-4 border-b">{product?.productCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <p className="mr-4 text-lg">Page {currentPage} of {totalPages}</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default AllProductsBystore;
