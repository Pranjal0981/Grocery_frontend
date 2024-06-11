import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncDelProduct, fetchProductsByStore } from '../store/actions/adminAction';
import queryString from 'query-string';

const ProductStore = () => {
    const { products, totalPages } = useSelector((state) => state.admin);
    const { store } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = queryString.parse(location.search);
    const initialPage = queryParams.page ? parseInt(queryParams.page, 10) : 1;
    const initialSearchQuery = queryParams.search || '';

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

    useEffect(() => {
        dispatch(fetchProductsByStore(store, currentPage, searchQuery));
    }, [dispatch, store, currentPage, searchQuery]);

    useEffect(() => {
        const newQueryString = queryString.stringify({ page: currentPage, search: searchQuery });
        navigate(`${location.pathname}?${newQueryString}`, { replace: true });
    }, [currentPage, searchQuery, navigate, location.pathname]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (id, currentPage, searchQuery) => {
        await dispatch(asyncDelProduct(id, store, currentPage, searchQuery));
    };

    const handleSearch = () => {
        setCurrentPage(1);
        dispatch(fetchProductsByStore(store, 1, searchQuery));
    };

    const handleUpdateProduct = (id) => {
        navigate(`/admin/update-product/${id}?page=${currentPage}&search=${searchQuery}`);
    };

    const handleClick = (productId) => {
        console.log(`Product clicked: ${productId}`);
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
                    <div key={product?._id} className="bg-white shadow-lg rounded-lg overflow-hidden" onClick={() => handleClick(product?._id)}>
                        <img src={product?.productId?.image?.url} alt={product.productId?.ProductName} className="w-full h-64 object-cover object-center" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{product?.productId?.productName}</h2>
                            <p className="text-gray-600">{product?.productId?.category}</p>
                            <p className="text-gray-700">{product?.productId?.description}</p>
                            <p className="text-gray-800 font-bold mt-2">MRP: Rs <s>{product?.productId?.MRP}</s></p>
                            <p className="text-gray-800 font-bold mt-2">Selling Price: Rs {product?.productId?.sellingPrice}</p>
                            <p className="text-gray-800 font-bold mt-2">Stock: {product?.stock}</p>
                            <p className="text-gray-800 font-bold mt-2">Product Code: {product?.productId?.productCode}</p>
                            <div className="flex gap-[30px]">
                                <button onClick={() => handleDelete(product?.productId?._id, currentPage, searchQuery)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">Delete</button>
                                <button onClick={() => handleUpdateProduct(product?.productId._id)} className="bg-sky-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">Update</button>
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
