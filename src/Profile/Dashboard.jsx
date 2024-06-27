import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";
import { IoIosGlobe } from "react-icons/io";
import { LuGitCompare } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { asyncSignOut, asyncSetPreferredStore } from '../store/actions/userAction';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuth } = useSelector((state) => state.user);
    const [preferredStore, setPreferredStore] = useState([]);
    const [selectedStore, setSelectedStore] = useState(user?.PreferredStore || '');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch the list of stores from the JSON file
        fetch('/stores.json')
            .then((response) => response.json())
            .then((data) => setPreferredStore(data))
            .catch((error) => console.error('Error fetching stores:', error));
    }, []);

    const handleLogout = () => {
        dispatch(asyncSignOut(navigate));
    }

    const handleStoreChange = (store) => {
        setSelectedStore(store);
    }

    const handleSubmitPreferredStore = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await dispatch(asyncSetPreferredStore({ selectedStore }, user._id));
            toast.success("Store Set");
        } catch (error) {
            toast.error("Failed to set store");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
            <h1 className='flex gap-5 items-center justify-center text-4xl p-8 bg-gradient-to-r from-blue-300 to-blue-500 text-white shadow-lg rounded-xl'>
                <FaUser /> MY ACCOUNT
            </h1>
            <div className="flex flex-col md:flex-row gap-4 mt-8">
                <div className="w-full md:w-1/3 bg-white shadow-2xl rounded-lg p-6">
                    <div className="flex flex-col items-center text-center">
                        <FaCircleUser className='text-6xl text-gray-600 mb-4' />
                        <h1 className='text-2xl font-bold'>{user?.firstName} {user?.lastName}</h1>
                        <h2 className='text-gray-600'>{user?.email}</h2>
                    </div>
                    <div className='mt-8'>
                        <Link to='/dashboard' className='flex items-center gap-3 py-2 text-lg text-gray-700 hover:text-blue-500 transition-colors'>
                            <MdDashboard />
                            Dashboard
                        </Link>
                        <Link to='/orders' className='flex items-center gap-3 py-2 text-lg text-gray-700 hover:text-blue-500 transition-colors'>
                            <BsBagCheck />
                            Orders
                        </Link>
                        <Link to='/address' className='flex items-center gap-3 py-2 text-lg text-gray-700 hover:text-blue-500 transition-colors'>
                            <IoIosGlobe />
                            Addresses
                        </Link>
                        <Link to='/wishlist' className='flex items-center gap-3 py-2 text-lg text-gray-700 hover:text-blue-500 transition-colors'>
                            <LuGitCompare />
                            Wishlist
                        </Link>
                        <button onClick={handleLogout} className='flex items-center gap-3 py-2 text-lg text-gray-700 hover:text-blue-500 transition-colors w-full text-left'>
                            <CiLogout />
                            Logout
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-2/3 bg-white shadow-2xl rounded-lg p-6">
                    <h1 className='text-2xl font-bold mb-4'>Welcome to your Account {user?.firstName} {user?.lastName}</h1>
                    <p className='mb-6'>Hi {user?.firstName} {user?.lastName}, today is a great day to check your account page. You can also check:</p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <Link to='/orders' className='bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform'>
                            <BsBagCheck className='inline-block mr-2' />
                            Recent Order
                        </Link>
                        <Link to='/address' className='bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform'>
                            <IoIosGlobe className='inline-block mr-2' />
                            Address
                        </Link>
                        <Link to='/account-details' className='bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform'>
                            <MdAccountCircle className='inline-block mr-2' />
                            Account Details
                        </Link>
                    </div>
                    {/* <form onSubmit={handleSubmitPreferredStore} className="flex flex-col md:flex-row items-center mt-8 gap-4">
                        <select
                            value={selectedStore}
                            onChange={(e) => handleStoreChange(e.target.value)}
                            className="border-2 border-gray-300 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="" disabled>Select Store</option>
                            {preferredStore.map((store, index) => (
                                <option key={index} value={store}>{store}</option>
                            ))}
                        </select>
                        <button type="submit" className={`bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                            {isLoading ? 'Setting...' : 'Set Preferred Store'}
                        </button>
                </form>
                     */}
                </div>
            </div>
        </div>
    );
}

export default Dashboard