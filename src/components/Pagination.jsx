import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CustomSpinner from '../Spinner';
import { CiFilter } from "react-icons/ci";
import {asyncFilterAll} from '../store/actions/productAction'
import { asyncAddToCart } from '../store/actions/userAction';
const Pagination = ({ currentPage, onPageChange }) => {
    const {user}=useSelector((state)=>state.user)
    const { product, loading } = useSelector(state => state.product);
    const [totalPages, setTotalPages] = useState(1); // Total
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
    const updateIsMobile = () => {
        setIsMobile(window.innerWidth <= 768); // Set breakpoint as per your design
    };
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Function to toggle the mobile filter
    const toggleMobileFilter = () => {
        setIsMobileFilterOpen(prevState => !prevState);
    };

    useEffect(() => {
        updateIsMobile(); // Check initial viewport size
        window.addEventListener('resize', updateIsMobile);
        return () => {
            window.removeEventListener('resize', updateIsMobile);
        };
    }, []);
  
    const handleExploreProduct = (id, brand) => {
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
        console.log(filterObject)
        await dispatch(asyncFilterAll(filterObject));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Calculate total pages when products change
        if (product?.length > 0) {
            const totalPages = Math.ceil(product.length / productsPerPage);
            setTotalPages(totalPages);
        }
    }, [product, productsPerPage]);

    if (showSpinner || loading) {
        return <CustomSpinner />;
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
const userId=user?._id
    const handleAddtoCart=()=>{
         dispatch(asyncAddToCart(userId, { productId: product._id, quantity:1 }));
    }

    return (
        <div className=" container mx-auto mt-10 grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1 relative">
                {/* Sidebar for Filters */}
                {isMobile && (
                    <>
                        <button
                            className="block relative translate-x-[40vw] z-[11] md:hidden text-blue-500  font-bold py-2 px-4 rounded "
                            onClick={toggleMobileFilter}
                        >
                            {isMobileFilterOpen ? (
                                <CiFilter className="h-6 w-6" />
                            ) : (
                                <CiFilter className="h-6 w-6" />
                            )}
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
                        <h2 className="text-xl font-semibold mb-4 ">Filters</h2>
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
                )}
            </div>
            <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.isArray(product) && product.map((product) => (
                        <div key={product?._id} className="bg-white rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                            <img src={product.image.url} alt={product?.ProductName} className="w-full h-64 object-cover rounded-t-md object-center hover:opacity-90" onClick={() => handleExploreProduct(product?._id)} />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{product?.ProductName}</h3>
                                <p className="text-sm mb-2">{product?.description}</p>
                                <p className="text-sm mb-2">{product?.brand}</p>
                                <p className="text-sm mb-2">{product?.Size}</p>
                                <p className="text-sm mb-2">MRP: {product?.MRP}</p>
                                <p className="text-sm text-gray-600">Selling Price: Rs {product?.sellingPrice}</p>
                            </div>
                            <button onClick={handleAddtoCart} className="block w-full py-2 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-white font-bold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                <span className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 5a1 1 0 0 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V5z" clipRule="evenodd" />
                                    </svg>
                                    Add to Cart
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className={`px-4 py-2 mr-2 ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:bg-blue-600'} text-white rounded`}
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



export default Pagination;
