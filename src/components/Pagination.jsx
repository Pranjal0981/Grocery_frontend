import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CustomSpinner from '../Spinner';
import { Tooltip } from 'react-tippy'; // Import Tooltip component
import { CiFilter } from "react-icons/ci";
import { asyncFilterAll, asyncFetchStorebyPID } from '../store/actions/productAction'
import { asyncAddToCart, } from '../store/actions/userAction';



const Pagination = ({ currentPage, onPageChange }) => {
    const { user } = useSelector((state) => state.user);
    const { product, loading } = useSelector(state => state.product);
    const [selectedStore, setSelectedStore] = useState({});
    const [totalPages, setTotalPages] = useState(1); // Total pages
    const productsPerPage = 8; // Number of products per page
    const [showSpinner, setShowSpinner] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({
        brand: '',
        minPrice: '',
        maxPrice: '',
        store: ''
    });
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Function to toggle the mobile filter
    const toggleMobileFilter = () => {
        setIsMobileFilterOpen(prevState => !prevState);
    };

    const updateIsMobile = () => {
        setIsMobile(window.innerWidth <= 768); // Set breakpoint as per your design
    };

    useEffect(() => {
        updateIsMobile(); // Check initial viewport size
        window.addEventListener('resize', updateIsMobile);
        return () => {
            window.removeEventListener('resize', updateIsMobile);
        };
    }, []);

    const [productQuantities, setProductQuantities] = useState({});
    const [loadingProductIds, setLoadingProductIds] = useState(new Set());
    const [addedProductIds, setAddedProductIds] = useState(new Set());

    const handleIncrementQuantity = (productId) => {
        setProductQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 0) + 1
        }));
    };

    const handleDecrementQuantity = (productId) => {
        setProductQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0)
        }));
    };

    const handleExploreProduct = (id) => {
        navigate(`/products/${id}`);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleFilterSubmit = async () => {
        // Filter object to be sent to the backend
        const filterObject = {};

        // Add brandName filter if it's not empty
        if (filters.brand.trim() !== '') {
            filterObject.brand = filters.brand.trim();
        }

        // Add store filter if it's not empty
        if (filters.store.trim() !== '') {
            filterObject.store = filters.store.trim();
        }

        // Add price filter if both minPrice and maxPrice are provided
        if (filters.minPrice !== '' && filters.maxPrice !== '') {
            filterObject.minPrice = parseFloat(filters.minPrice);
            filterObject.maxPrice = parseFloat(filters.maxPrice);
        }

        // Dispatch the action to fetch filtered products
        console.log(filterObject);
        await dispatch(asyncFilterAll(filterObject));
    };

    const userId = user?._id;

    const handleAddToCart = async (productId) => {
        setLoadingProductIds(prevState => new Set(prevState).add(productId));
        const quantity = productQuantities[productId] || 1; // Default to 1 if quantity is not set
        await dispatch(asyncAddToCart(userId, { productId, quantity }));
        setLoadingProductIds(prevState => {
            const newState = new Set(prevState);
            newState.delete(productId);
            return newState;
        });
        setAddedProductIds(prevState => new Set(prevState).add(productId));
        setTimeout(() => {
            setAddedProductIds(prevState => {
                const newState = new Set(prevState);
                newState.delete(productId);
                return newState;
            });
        }, 3000); // Reset after 3 seconds
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                loadMoreProducts();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Calculate total pages when products change
        if (product?.length > 0) {
            const totalPages = Math.ceil(product.length / productsPerPage);
            setTotalPages(totalPages);
        }
    }, [product, productsPerPage]);

    if (showSpinner || loading) {
        return (
        <div className='w-full ml-auto'>
            <CustomSpinner />
        </div>
        )
    } else if (!product || product.length === 0) {
        return (
            <div className="container mx-auto mt-20 flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">No Products Found</h2>
                    <img src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png" alt="No Products Found" className="w-64 h-64 mx-auto mb-8" />
                    <p className="text-lg text-gray-600 mb-8">Oops! We couldn't find any products matching your criteria.</p>
                    <p className="text-lg text-gray-600 mb-8">Try adjusting your filters or check back later.</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400" onClick={() => navigate('/')}>
                        Browse All Products
                    </button>
                </div>
            </div>
        );
    }

    const handleStoreChange = (productId, storeName) => {
        setSelectedStore(prevState => ({
            ...prevState,
            [productId]: storeName
        }));
    };

    return (
        <div className="container mx-auto mt-10 grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1 relative">
                {/* Sidebar for Filters */}
                {isMobile && (
                    <>
                        <button
                            className="block relative translate-x-[40vw] z-[11] md:hidden text-blue-500  font-bold py-2 px-4 rounded "
                            onClick={toggleMobileFilter}
                        >
                            <CiFilter className="h-6 w-6" />
                        </button>

                        {isMobileFilterOpen && (
                            <MobileFilter
                                filters={filters}
                                handleFilterChange={handleFilterChange}
                                handleFilterSubmit={handleFilterSubmit}
                            />
                        )}
                    </>
                )}
                {!isMobile && (
                    <div className="bg-white w-[20vw] rounded-lg shadow-md p-6 mb-6 sticky top-[10%]">
                        <h2 className="text-xl font-semibold mb-4">Filters</h2>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="brandName" className="text-sm font-medium mb-1">Brand Name</label>
                                <input
                                    type="text"
                                    id="brandName"
                                    name="brand"
                                    value={filters.brand}
                                    onChange={handleFilterChange}
                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="minPrice" className="text-sm font-medium mb-1">Min Price</label>
                                <input
                                    type="number"
                                    id="minPrice"
                                    name="minPrice"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="maxPrice" className="text-sm font-medium mb-1">Max Price</label>
                                <input
                                    type="number"
                                    id="maxPrice"
                                    name="maxPrice"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                    className="border border-gray-300 rounded px
                                    px-3 py-2 focus:outline-none focus:border-blue-400"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="store" className="text-sm font-medium mb-1">Store</label>
                                <input
                                    type="text"
                                    id="store"
                                    name="store"
                                    value={filters.store}
                                    onChange={handleFilterChange}
                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                                />
                            </div>
                            <button
                                onClick={handleFilterSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="lg:col-span-2">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.isArray(product) && product.map((product) => (
                        <div
                            key={product?._id}
                            className="bg-white rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 relative"
                        >
                            <img
                                src={product.image.url}
                                alt={product?.productName}
                                className="w-full h-64 object-cover rounded-t-lg object-center hover:opacity-90"
                                onClick={() => handleExploreProduct(product?._id)}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{product?.productName}</h3>
                                <p className="text-sm mb-2 text-gray-700">{product?.description}</p>
                                <p className="text-sm mb-2 text-gray-700">{product?.brand}</p>
                                <p className="text-sm mb-2 text-gray-700">{product?.size}</p>
                                <p className="text-sm mb-2 text-gray-700">MRP: Rs {product?.MRP}</p>
                                <p className="text-sm font-semibold text-blue-600">Selling Price: Rs {product?.sellingPrice}</p>
                            </div>

                            <div className="px-4 pb-4 flex items-center flex-col gap-2 justify-between">
                                <div className="flex items-center">
                                    <button onClick={() => handleDecrementQuantity(product._id)} className="bg-gray-200 text-gray-700 font-bold rounded-md px-3 py-1 mr-2 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 10a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2H5z" />
                                        </svg>
                                    </button>
                                    <span className="text-lg font-bold">{productQuantities[product._id] || 1}</span>
                                    <button onClick={() => handleIncrementQuantity(product._id)} className="bg-gray-200 text-gray-700 font-bold rounded-md px-3 py-1 ml-2 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1z" />
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(product._id)}
                                    className={`text-white font-bold rounded-md px-4 py-2 focus:outline-none transition duration-300 ease-in-out 
                                    ${loadingProductIds.has(product._id) ? 'bg-gray-500 cursor-not-allowed' :
                                            addedProductIds.has(product._id) ? 'bg-green-500' :
                                                'bg-blue-500 hover:bg-blue-600 hover:shadow-md'}`}
                                    disabled={loadingProductIds.has(product._id)}
                                >
                                    {loadingProductIds.has(product._id) ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    ) : addedProductIds.has(product._id) ? 'Added' : 'Add to Cart'}
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        className={`px-4 py-2 mr-2 text-white rounded ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:bg-blue-600'}`}
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-white rounded"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );

};





export default Pagination;


const MobileFilter = ({ filters, handleFilterChange, handleFilterSubmit }) => {
    return (
        <div className="flex items-center justify-center w-[100vw]">
            <div className="bg-white w-[90vw] rounded-lg shadow-md p-6 mb-6  absolute z-[10] top-[15%]">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="brandName" className="text-sm font-medium mb-1">Brand Name</label>
                        <input
                            type="text"
                            id="brandName"
                            name="brand"
                            value={filters.brand}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="minPrice" className="text-sm font-medium mb-1">Min Price</label>
                        <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="maxPrice" className="text-sm font-medium mb-1">Max Price</label>
                        <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="store" className="text-sm font-medium mb-1">Store</label>
                        <input
                            type="text"
                            id="store"
                            name="store"
                            value={filters.store}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <button
                        onClick={handleFilterSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>

    );
};



