import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncDelProduct, asyncUpdateProduct, fetchProductsByStore } from '../store/actions/adminAction';

const ProductStore = () => {
    const { products,totalPages } = useSelector((state) => state.admin);
    
    const { store } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchProductsByStore(store, currentPage, searchQuery));
    }, [dispatch, store, currentPage]);
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (id) => {
        await dispatch(asyncDelProduct(id, store));
    };

    const handleSearch = () => {
        setCurrentPage(1);
        dispatch(fetchProductsByStore(store, 1, searchQuery));
    };
    const handleUpdateProduct = async (id) => {
        navigate(`/admin/update-product/${id}`);
    };

    return (
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
                <button onClick={handleSearch} className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Search</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products?.map((product) => (
                    <div key={product?._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src={product?.image?.url} alt={product?.ProductName} className="w-full h-64 object-cover object-center" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{product?.ProductName}</h2>
                            <p className="text-gray-600">{product?.category}</p>
                            <p className="text-gray-700">{product?.description}</p>
                            <p className="text-gray-800 font-bold mt-2">Selling Price: Rs {product?.sellingPrice}</p>
                            <p className="text-gray-800 font-bold mt-2">MRP: Rs {product?.MRP}</p>
                            <p className="text-gray-800 font-bold mt-2">Stock: {product?.stock}</p>
                            <p className="text-gray-800 font-bold mt-2">Product Code: {product?.ProductCode}</p>
                            <div className="flex gap-[30px]">
                                <button onClick={() => handleDelete(product?._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">Delete</button>
                                <button onClick={() => handleUpdateProduct(product?._id)} className="bg-sky-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">Update</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <p className="mr-4 text-lg">Page {currentPage} of {totalPages}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default ProductStore;
