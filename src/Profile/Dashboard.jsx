import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";
import { IoIosGlobe } from "react-icons/io";
import { LuGitCompare } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux';
const Dashboard = () => {
    const dispatch=useDispatch()
    const {user,isAuth}=useSelector((state)=>state.user)
    console.log(user)
    return <>
        <div className="h-full w-full">
            <h1 className='flex gap-[20px] w-full items-center justify-center text-4xl p-[30px] bg-gray-100'><FaUser /> MY ACCOUNT</h1>
            <div className="main-dv w-full h-[70vh] flex">
                <div className="left w-[30%] h-[100%] bg-gray-200 flex flex-col  justify-evenly p-[10px]">
                    <div className="flex flex-col justify-center">
                        <FaCircleUser className='text-6xl text-gray-600' />
                        <h1>{user?.firstName}{user?.lastName}</h1>
                        <h1>{user?.email}</h1>
                    </div>
                    
                    <div className='flex flex-col gap-[20px]'>
                        <Link to='/dashboard' className='flex items-center gap-[10px]'>
                            <MdDashboard/>
                            Dashboard</Link>
                        <Link to='/orders' className='flex items-center gap-[10px]'>
                            <BsBagCheck/>
                            Orders</Link>
                        <Link to='/address' className='flex items-center gap-[10px]'>
                            <IoIosGlobe/>
                            Addresses</Link>
                        <Link to='/wishlist' className='flex items-center gap-[10px]'>
                            <LuGitCompare/>
                            Wishlist</Link>
                        <Link to='/compare' className='flex items-center gap-[10px]'>
                            <CiHeart/>
                            Compare</Link>
                        <Link to='/logout' className='flex items-center gap-[10px]'>
                            <CiLogout/>
                            Logout</Link>
                    </div>
                  

                </div>

                <div className="right w-[70%] h-full p-[10px]">
                    <h1 className='text-2xl'>Welcome to your Account Page</h1>
                    <p>Hi {user?.firstName} {user?.lastName}, today is a great day to check your account page. You can check also:</p>
                    <div className="flex w-full justify-evenly p-[10px] mt-[20px]">
                        <Link to='/orders' className='bg-orange-500 flex items-center justify-center gap-[10px] text-white w-[250px] text-center text-[17px] p-[10px] pl-[10px] pr-[10px] rounded-full'>
                            <BsBagCheck/>
                            Recent Order</Link>
                        <Link to='/address' className='bg-orange-500 flex items-center justify-center gap-[10px] text-white w-[250px] text-center p-[10px] pl-[10px] pr-[10px] rounded-full'>
                            <IoIosGlobe/>
                            Address</Link>
                        <Link to='/edit-details' className='bg-orange-500 flex items-center justify-center gap-[10px] text-white w-[250px] text-center p-[10px] pl-[10px] pr-[10px] rounded-full'>
                            <MdAccountCircle/>
                            Account Details</Link>

                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Dashboard