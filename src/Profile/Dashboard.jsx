import React from 'react';
import { FaUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";
import { IoIosGlobe } from "react-icons/io";
import { LuGitCompare } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { asyncSignOut } from '../store/actions/userAction';
const Dashboard = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const { user, isAuth } = useSelector((state) => state.user);
    const handleLogout=()=>{
        dispatch(asyncSignOut(navigate))
       
    }
    return (
        <div className="h-full w-full">
            <h1 className='flex gap-[20px] w-full items-center justify-center text-4xl p-[30px] bg-gray-100'><FaUser /> MY ACCOUNT</h1>
            <div className="main-dv w-full h-[70vh] flex flex-col md:flex-row">
                <div className="left w-full md:w-[30%] h-[100%] bg-gray-200 flex flex-col justify-evenly p-[10px]">
                    <div className="flex flex-col justify-center items-center">
                        <FaCircleUser className='text-6xl text-gray-600' />
                        <h1>{user?.firstName} {user?.lastName}</h1>
                        <h1>{user?.email}</h1>
                    </div>

                    <div className='flex flex-col gap-[20px]'>
                        <Link to='/dashboard' className='flex items-center gap-[10px]'>
                            <MdDashboard />
                            Dashboard
                        </Link>
                        <Link to='/orders' className='flex items-center gap-[10px]'>
                            <BsBagCheck />
                            Orders
                        </Link>
                        <Link to='/address' className='flex items-center gap-[10px]'>
                            <IoIosGlobe />
                            Addresses
                        </Link>
                        <Link to='/wishlist' className='flex items-center gap-[10px]'>
                            <LuGitCompare />
                            Wishlist
                        </Link>
                        <Link to='/compare' className='flex items-center gap-[10px]'>
                            <CiHeart />
                            Compare
                        </Link>
                        <Link  className='flex items-center gap-[10px]' onClick={handleLogout}>
                            <CiLogout />
                            Logout
                        </Link>
                    </div>
                </div>

                <div className="right w-full md:w-[70%] h-full p-[10px]">
                    <h1 className='text-2xl'>Welcome to your Account Page</h1>
                    <p>Hi {user?.firstName} {user?.lastName}, today is a great day to check your account page. You can also check:</p>
                    <div className="flex flex-col md:flex-row w-full justify-center items-center md:justify-between p-[10px] mt-[20px]">
                        <Link to='/orders' className='bg-orange-500 flex items-center justify-center gap-[10px] text-white w-[250px] md:w-auto text-center text-[17px] p-[10px] pl-[10px] pr-[10px] rounded-full mb-[10px] md:mb-0'>
                            <BsBagCheck />
                            Recent Order
                        </Link>
                        <Link to='/address' className='bg-orange-500 flex items-center justify-center gap-[10px] text-white w-[250px] md:w-auto text-center p-[10px] pl-[10px] pr-[10px] rounded-full mb-[10px] md:mb-0'>
                            <IoIosGlobe />
                            Address
                        </Link>
                        <Link to='/account-details' className='bg-orange-500 flex items-center justify-center gap-[10px] text-white w-[250px] md:w-auto text-center p-[10px] pl-[10px] pr-[10px] rounded-full'>
                            <MdAccountCircle />
                            Account Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
