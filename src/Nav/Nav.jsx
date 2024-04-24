import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaUser, FaHeart, FaShoppingBag, FaSearchengin } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux'
import { asyncAdminRegister } from '../store/actions/adminAction';
import { asyncSignIn, asyncSignupUser } from '../store/actions/userAction';
const Nav = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [secondOpen, setSecondOpen]=React.useState(false)
    const dispatch=useDispatch()
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: '' // Add userType to the state
    });
    const {user,isAuth}=useSelector((state)=>state.user)
    console.log(user)
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(open);
    };

    const toggleSecondDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setSecondOpen(open);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    const links = [
        { label: 'All Departments Menu', to: '/all-departments' },
        { label: 'Home', to: '/home' },
        { label: 'Shop', to: '/shop' },
        { label: 'About Us', to: '/about-us' },
        { label: 'Blog', to: '/blog' },
        { label: 'Contacts', to: '/contact' }
    ];
    const socialMediaLinks = [
        { icon: <FaFacebook />, to: 'https://facebook.com' },
        { icon: <FaTwitter />, to: 'https://twitter.com' },
        { icon: <FaInstagram />, to: 'https://instagram.com' },
        { icon: <FaYoutube />, to: 'https://youtube.com' }
    ];
    const handleInputChange = (e) => {
        // Update the corresponding field in the form data state
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(formData.userType==='vendor'){
            dispatch(asyncAdminRegister({formData}))
        }
        else{
            dispatch(asyncSignupUser({formData}))
        }
    }
    const handleLogin=(e)=>{
e.preventDefault()
dispatch(asyncSignIn({formData}))
    }
    return (
        <>
            <div className="flex justify-around items-center h-[10vh] bg-[#96B415]">
                <div className="flex items-center gap-5">
                    <h1 className="ml-5 text-xl">
                        <img src="/RGS-New-Logo.webp" className="h-12" alt="" />
                    </h1>
                    <button onClick={toggleDrawer(true)} className="flex items-center justify-center w-8 h-8 text-white rounded-full border-2 border-white">
                        <FaBars />
                    </button>
                </div>

                <div className="flex items-center rounded-full bg-white border border-gray-300">
                    <select className="px-3 py-1 bg-transparent border-none focus:outline-none text-lg">
                        <option value="All categories">All categories</option>
                        <option value="Category 1">Category 1</option>
                        <option value="Category 2">Category 2</option>
                        <option value="Category 3">Category 3</option>
                    </select>
                    <input
                        type="text"
                        className="w-full px-3 py-1 bg-transparent border-none focus:outline-none text-lg"
                        placeholder="Search"
                    />
                    <button className="px-3 py-1 bg-transparent border-none focus:outline-none">
                        <FaSearchengin className="text-lg" />
                    </button>
                </div>

                <div className="flex">
                    <button className="flex gap-2 items-center text-white text-lg" onClick={toggleSecondDrawer(true)}>
                        <FaUser />
                        My Account
                    </button>
                </div>

                <div className="flex">
                    <button className="flex gap-2 items-center text-white text-lg">
                        <FaHeart />
                        Wishlist
                    </button>
                </div>

                <div className="flex bg-white rounded-full w-[100px] h-[35px] justify-center ">
                    <button className="flex gap-2 items-center text-white text-lg text-green-600">
                        <FaShoppingBag />
                        Cart
                    </button>
                </div>
            </div>
            <div className="flex justify-between p-[10px]">
                <div className="left flex w-[50%] justify-evenly">
                    {links.map((link, index) => (
                        <Link to={link.to} key={index}>
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="right w-[30%] flex items-center gap-[20px]">
                    <div>
                        <Link to="tel:+919244321195">Call +91-9244321195</Link>
                    </div>

                    <div className='flex gap-[10px]'>
                        {socialMediaLinks.map((socialMedia, index) => (
                            <Link to={socialMedia.to} key={index}>
                                {socialMedia.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <hr />



            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}

            >
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    sx={{ backgroundColor: '#96B415', color: 'white', width: '300px' }}
                >
                    <Tab label="Menu" sx={{ color: 'white', width: '150px' }} />
                    <Tab label="Categories" sx={{ color: 'white', width: '150px' }} />
                </Tabs>

                {selectedTab === 0 ? (
                    <div className='h-full bg-[#96B415]'>
                        <List className='text-white flex flex-col w-full justify-center items-center'>
                            <div className="mt-5 mb-5 flex items-center justify-center ">
                                <input
                                    type="text"
                                    className="w-[80%] px-3 py-1 bg-white border-none focus:outline-none text-lg text-black"
                                    placeholder="Search"
                                />
                            </div>
                            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button>
                                    <ListItemText primary="Home" />
                                </ListItem>
                            </Link>
                            <Link to="/our-business" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button>
                                    <ListItemText primary="Join Our Business" />
                                </ListItem>
                            </Link>
                            <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button>
                                    <ListItemText primary="Shop" />
                                </ListItem>
                            </Link>
                            <Link to="/aboutus" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button>
                                    <ListItemText primary="About Us" />
                                </ListItem>
                            </Link>
                            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button>
                                    <ListItemText primary="Contact Us" />
                                </ListItem>
                            </Link>
                            <div className="flex mt-auto mb-5">
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                                    <FaInstagram />
                                </a>
                                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                                    <FaTwitter />
                                </a>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                                    <FaFacebook />
                                </a>
                                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                                    <FaYoutube />
                                </a>
                            </div>
                        </List>
                    </div>



                ) : (
                    <div className='h-full bg-[#96B415]'>

                        <List className='bg-[#96B415] h-full text-white' >
                            {[
                                { label: "Oral Care & Wellness", link: "/oral-care-wellness" },
                                { label: "Atta, Rice & Dal", link: "/atta-rice-dal" },
                                { label: "Household & Cleaning", link: "/household-cleaning" },
                                { label: "Spices, Salt & Sugar", link: "/spices-salt-sugar" },
                                { label: "Pooja Samagri", link: "/pooja-samagri" },
                                { label: "Oil & Ghee", link: "/oil-ghee" },
                                { label: "Dry Fruits, Nuts & Seeds", link: "/dry-fruits-nuts-seeds" },
                                { label: "Snacks & Packaged Food", link: "/snacks-packaged-food" },
                                { label: "Beverages", link: "/beverages" },
                                { label: "Chocolates & Sweets", link: "/chocolates-sweets" },
                                { label: "Laundry & Dishwash", link: "/laundry-dishwash" },
                                { label: "Body & Skin Care", link: "/body-skin-care" },
                                { label: "Hair Care", link: "/hair-care" },
                            ].map(({ label, link }, index) => (
                                <Link to={link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItem button>
                                        <ListItemText primary={label} />
                                    </ListItem>
                                </Link>
                            ))}
                            <div className="flex mt-auto mb-5">
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                                    <FaInstagram />
                                </a>
                                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                                    <FaTwitter />
                                </a>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                                    <FaFacebook />
                                </a>
                                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                                    <FaYoutube />
                                </a>
                            </div>
                        </List>
                    </div>
                )}
            </Drawer>



            <Drawer
                anchor="right"
                open={secondOpen} // Adjust the width as needed
                onClose={toggleSecondDrawer(false)}
            >
                {user  ? (
                    <div className='h-full w-[300px] p-[40px]'>
                        <List className='flex flex-col w-full gap-[20px]'>
                            <h1 className='text-center'>MY ACCOUNT</h1>
                            <Link to="/dashboard" className="" style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                    <ListItemText primary="Dashboard" />
                                </ListItem>
                            </Link>
                            <Link to="/orders" className="" style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                    <ListItemText primary="Orders" />
                                </ListItem>
                            </Link>
                            <Link to="/address" className="" style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                    <ListItemText primary="Addresses" />
                                </ListItem>
                            </Link>
                            <Link to="/account-details" className="" style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                    <ListItemText primary="ACCOUNT DETAILS" />
                                </ListItem>
                            </Link>
                            <Link to="/wishlist" className="" style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                    <ListItemText primary="WISHLIST" />
                                </ListItem>
                            </Link>
                            <Link to="/compare" className="" style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                    <ListItemText primary="COMPARE" />
                                </ListItem>
                            </Link>
                            <Link to="/logout" className="" style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                    <ListItemText primary="LOGOUT" />
                                </ListItem>
                            </Link>
                        </List>
                    </div>
                ) : (
                        <div className="flex justify-center items-center h-screen">
                            <div className="bg-gray-200 p-8 rounded-lg shadow-md">
                                <Tabs
                                    value={selectedTab}
                                    onChange={handleTabChange}
                                    sx={{ backgroundColor: '#dadada', color: 'black', width: '300px' }}
                                >
                                    <Tab label="Sign In" sx={{ color: 'black', width: '50%' }} />
                                    <Tab label="Sign Up" sx={{ color: 'black', width: '50%' }} />
                                </Tabs>
                                {selectedTab === 0 && (
                                    <div className='p-8'>
                                        {/* Sign In Form */}
                                        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
                                            <input type="email" placeholder="Email" className="border border-gray-300 px-4 py-2 rounded focus:outline-none" onChange={handleInputChange} />
                                            <input type="password" placeholder="Password" className="border border-gray-300 px-4 py-2 rounded focus:outline-none" onChange={handleInputChange} />
                                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 focus:outline-none">Sign In</button>
                                        </form>
                                    </div>
                                )}
                                {selectedTab === 1 && (
                                    <div className='p-8'>
                                        {/* Sign Up Form */}
                                        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                placeholder="Email"
                                                className="border border-gray-300 px-4 py-2 rounded focus:outline-none"
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                placeholder="Password"
                                                className="border border-gray-300 px-4 py-2 rounded focus:outline-none"
                                                onChange={handleInputChange}
                                            />
                                            <div className="flex items-center space-x-4">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="userType"
                                                        value="customer"
                                                        className="mr-2"
                                                        onChange={handleInputChange}
                                                    />
                                                    Customer
                                                </label>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="userType"
                                                        value="vendor"
                                                        className="mr-2"
                                                        onChange={handleInputChange}
                                                    />
                                                    Vendor
                                                </label>
                                            </div>
                                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 focus:outline-none">
                                                Sign Up
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>



                )}
            </Drawer>

        </>
    );
};

export default Nav;
