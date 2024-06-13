import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText'
import { Collapse, ListItemButton} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaUser, FaHeart, FaShoppingBag, FaSearchengin, FaSearch } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { asyncAdminLogin, asyncAdminRegister, asyncLogoutAdmin } from '../store/actions/adminAction';
import { asyncSignIn, asyncSignOut, asyncSignupUser } from '../store/actions/userAction';
import { asyncSearch } from '../store/actions/productAction';
import { asyncSuperAdminSignIn, asyncSuperAdminSignUp, asyncSignOutSuperAdmin } from '../store/actions/superAdminAction';
import { asyncStoreLogout } from '../store/actions/storeManagerAction';
import { useEffect } from 'react';
import CountdownTimer from './Coundown';

const Nav = () => {
    const navigate=useNavigate()
    const [expirationTime, setExpirationTime] = useState();

    useEffect(() => {
        const timer = setInterval(() => {
            // Update expiration time every second
            setExpirationTime(localStorage.getItem('tokenExpiration'));
        }, 1000);

        return () => clearInterval(timer);
    }, []);  
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [secondOpen, setSecondOpen] = React.useState(false)
    const dispatch = useDispatch()
    const [openStore, setOpenStore] = useState(false);

    const [openOrders, setOpenOrders] = useState(false);
    const [openSheet, setOpenSheet] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm,setSearchTerm]=useState([])
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChangeSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        // Fetch the list of stores from the JSON file
        fetch('/stores.json')
            .then((response) => response.json())
            .then((data) => setStores(data))
            .catch((error) => console.error('Error fetching stores:', error));
    }, []);
    const handleChangeCategory = (event) => {
        setSelectedCategory(event.target.value);
    };
 const { user, isAuth } = useSelector((state) => state.user)
// conso
   
const handleSearch = async(searchTerm, selectedCategory)=> {
       
        await dispatch(asyncSearch(searchTerm, selectedCategory, user?.PreferredStore));
        navigate(`/search-results?searchTerm=${searchTerm}&category=${selectedCategory}&store=${user?.PreferredStore}`)
    }
    const handleStoreClick = () => {
        setOpenStore(!openStore);
    };
    const handleOrderClick = () => {
        setOpenOrders(!openOrders);
    };
    const handleSheet=()=>{
        setOpenSheet(!openSheet)
    }
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: '',
        store:''
    });
    // console.log(user.store)

    const handleToggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
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
        { label: 'Home', to: '/' },
        { label: 'Shop', to: '/shop' },
        { label: 'About Us', to: '/About Us' },
        { label: 'Blog', to: '/blog' },
        { label: 'Contacts', to: '/contact' },

    ];
    const socialMediaLinks = [
        { icon: <FaFacebook />, to: 'https://facebook.com' },
        { icon: <FaTwitter />, to: 'https://twitter.com' },
        { icon: <FaInstagram />, to: 'https://instagram.com' },
        { icon: <FaYoutube />, to: 'https://youtube.com' }
    ];
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleCustomerSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setLoading(true)
        try{
        await dispatch(asyncSignupUser({ formData }))
        }
         catch (err) {
            setError('Error sending reset link. Please try again.');
        } finally {
            setLoading(false);
        }

    }
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await dispatch(asyncSignIn({ formData }));
            // Redirect to /all-departments after successful login
            navigate('/all-departments');
            // Hide the drawer after successful login
            setDrawerOpen(false);
            // Hide the second drawer after successful login
            setSecondOpen(false);
        } catch (err) {
            setError('Failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgetPassword=()=>{
            setDrawerOpen(false);
            setSecondOpen(false)
        
    }

    const handleLogout = async (e) => {
        e.preventDefault()
        if (user?.userType === 'Admin') {
            await dispatch(asyncLogoutAdmin());
            setSecondOpen(false)

                }
        if (user?.userType === 'customer') {
          await  dispatch(asyncSignOut())
            setSecondOpen(false)

        }
        if(user?.userType=='SuperAdmin'){
            await dispatch(asyncSignOutSuperAdmin())
            setSecondOpen(false)

        }
        if(user?.userType==='Storemanager'){
           await dispatch(asyncStoreLogout())
            setSecondOpen(false)

        }
        navigate('/')

    }
    const isAdmin = isAuth && user?.userType === 'Admin';
    const isUser = isAuth && user?.userType === 'customer';
    const isSuperAdmin=isAuth && user?.userType==='SuperAdmin'

    const categories = [
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
    ];


    return (
        <>
            <div className="flex gap-[20px] justify-around items-center h-[10vh] w-auto bg-[#96B415] sticky top-[0%] z-[99]">
                <button onClick={handleToggleDrawer(true)} className="flex items-center justify-center w-8 h-8 text-white rounded-full border-2 border-white">
                    <FaBars />
                </button>
                <div className="flex items-center gap-5">
                    <h1 className="ml-5 text-xl">
                        <Link to='/'>
                            <img src="/RGS-New-Logo.webp" className="h-12" alt="" />
                        </Link>
                    </h1>
                </div>
                <div className="hidden md:flex items-center rounded-full bg-white text-black-200 border border-gray-300">
                    <select
                        className="px-3 py-1 bg-transparent border-none focus:outline-none text-lg"
                        value={selectedCategory}
                        onChange={handleChangeCategory}
                    >
                        <option value="All categories">All categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.label}>{category.label}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="w-full px-3 py-1 bg-transparent border-none focus:outline-none text-lg"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleChangeSearchTerm}
                    />
                    <button className="px-3 py-1 bg-transparent border-none focus:outline-none" onClick={() => handleSearch(searchTerm, selectedCategory)}>
                        <FaSearchengin className="text-lg" />
                    </button>
                </div>
                <div className="flex">
                    <button className="flex gap-2 items-center text-white text-lg" onClick={toggleSecondDrawer(true)}>
                        <FaUser />
                        <p className='hidden md:block'>My Account</p>
                    </button>
                </div>
                <div className="flex">
                    <Link to='/wishlist' className="flex gap-2 items-center text-white text-lg">
                        <FaHeart />
                        <p className='hidden md:block'>WISHLIST</p>
                    </Link>
                </div>
                <div className="flex bg-white rounded-full w-[100px] h-[35px] justify-center ">
                    <Link to='/cart' className="flex gap-2 items-center  text-lg ">
                        <FaShoppingBag />
                        <p className='hidden md:block'>CART</p>
                    </Link>
                </div>
            </div>
            <div className="hidden md:flex justify-between p-[10px] ">
                <div className=" md:left flex w-[50%] justify-evenly">
                    {links.map((link, index) => (
                        <Link to={link.to} key={index} onClick={handleToggleDrawer(false)}>
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="md:right w-[30%] flex items-center gap-[20px]">
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
                onClose={handleToggleDrawer(false)}
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
                                    placeholder="Search" value={searchTerm}
                                    onChange={handleChangeSearchTerm}
                                />
                                <button className="px-3 py-1 bg-transparent border-none focus:outline-none" onClick={() => handleSearch(searchTerm, selectedCategory)}>
                                    <FaSearchengin className="text-lg" />
                                </button>
                            </div>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button onClick={handleToggleDrawer(false)}>
                                    <ListItemText primary="Home" />
                                </ListItem>
                            </Link>
                            <Link to="/our-business" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button onClick={handleToggleDrawer(false)}>
                                    <ListItemText primary="Join Our Business" />
                                </ListItem>
                            </Link>
                            <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button onClick={handleToggleDrawer(false)}>
                                    <ListItemText primary="Shop" />
                                </ListItem>
                            </Link>
                            <Link to="/About Us" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button onClick={handleToggleDrawer(false)}>
                                    <ListItemText primary="About Us" />
                                </ListItem>
                            </Link>
                            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button onClick={handleToggleDrawer(false)}>
                                    <ListItemText primary="Contact Us" />
                                </ListItem>
                            </Link>
                            <Link to="/storemanager/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem button onClick={handleToggleDrawer(false)}>
                                    <ListItemText primary="Store Login" />
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
                            {categories.map(({ label, link }, index) => (
                                <Link to={`/category/${label}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleToggleDrawer(false)}>
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
                open={secondOpen}
                onClose={toggleSecondDrawer(false)}
            >
                {user?.userType === "customer" ? (
                    <div className='h-full w-[300px] p-[40px]'>
                        <List className='flex flex-col w-full gap-[20px]'>
                            <h1 className='text-center'>MY ACCOUNT</h1>
                            <Link to="/dashboard" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                                <ListItem button>
                                    <ListItemText primary="DASHBOARD" />
                                </ListItem>
                            </Link>
                            <Link to="/orders" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                                <ListItem button>
                                    <ListItemText primary="ORDERS" />
                                </ListItem>
                            </Link>
                            <Link to="/edit-address" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                                <ListItem button>
                                    <ListItemText primary="ADDRESS" />
                                </ListItem>
                            </Link>
                            <Link to="/account-details" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                                <ListItem button>
                                    <ListItemText primary="ACCOUNT DETAILS" />
                                </ListItem>
                            </Link>
                            <Link to="/wishlist" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                                <ListItem button>
                                    <ListItemText primary="WISHLIST" />
                                </ListItem>
                            </Link>

                            <Link to="/logout" className="" style={{ textDecoration: 'none' }} onClick={handleLogout}>
                                <ListItem button>
                                    <ListItemText primary="LOGOUT" />
                                </ListItem>
                            </Link>
                        </List>
                    </div>
                ) : user?.userType === "Admin" ? (
                    <div className="admin-dashboard h-full w-[300px] p-[40px]">
                        <List className='flex flex-col w-full gap-[20px]'>
                            <h1 className='text-center'>ADMIN ACCOUNT</h1>
                            <Link to="/admin/upload-products" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                                <ListItem button>
                                    <ListItemText primary="Upload Products" />
                                </ListItem>
                            </Link>

                                <ListItem button onClick={() => handleOrderClick()}>
                                    <ListItemText primary="All Orders" />
                                    {openOrders ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={openOrders} timeout="auto" unmountOnExit>
                                    {stores.map((store, index) => (
                                        <ListItemButton key={index} component={Link} to={`/superadmin/orders/${store}`} onClick={toggleSecondDrawer(false)}>
                                            <ListItemText primary={store} />
                                        </ListItemButton>
                                    ))}
                                </Collapse>

                            <Link to="/admin/fetchOutOfStockProducts" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                                <ListItem button>
                                    <ListItemText primary="Out Of Stock" />
                                </ListItem>
                            </Link>
                            <ListItem button onClick={() => handleStoreClick()}>
                                <ListItemText primary="Stores" />
                                {openStore ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openStore} timeout="auto" unmountOnExit>
                                {stores.map((store, index) => (
                                    <ListItemButton key={index} component={Link} to={`/stores/fetchProducts/${store}`} onClick={toggleSecondDrawer(false)}>
                                        <ListItemText primary={store} />
                                    </ListItemButton>
                                ))}
                            </Collapse>
                            <Link to="/admin/logout" className="" style={{textDecoration: 'none' }} onClick={handleLogout}>
                                    <ListItem button>
                                    < ListItemText primary="Logout" />
                        </ListItem>
                    </Link>
                        </List>
        </div >
                ) : user?.userType === "SuperAdmin" ? (
    <div className="admin-dashboard h-full w-[300px] p-[40px]">
        <List className='flex flex-col w-full gap-[20px]'>
            <h1 className='text-center'>SUPER ADMIN ACCOUNT</h1>
            <Link to="/superadmin/dashboard" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                <ListItem button>
                    <ListItemText primary="Super Admin Dashboard" />
                </ListItem>
            </Link>
            <ListItem button onClick={() => handleOrderClick()}>
                <ListItemText primary="All Orders" />
                {openOrders ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openOrders} timeout="auto" unmountOnExit>
                {stores.map((store, index) => (
                    <ListItemButton key={index} component={Link} to={`/superadmin/orders/${store}`} onClick={toggleSecondDrawer(false)}>
                        <ListItemText primary={store} />
                    </ListItemButton>
                ))}
            </Collapse>
            <Link to="/admin/upload-products" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                <ListItem button>
                    <ListItemText primary="Upload Products" />
                </ListItem>
            </Link>
            <ListItem button onClick={() => handleStoreClick()}>
                <ListItemText primary="Stores" />
                {openStore ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openStore} timeout="auto" unmountOnExit>
                {stores.map((store, index) => (
                    <ListItemButton key={index} component={Link} to={`/stores/fetchProducts/${store}`} onClick={toggleSecondDrawer(false)}>
                        <ListItemText primary={store} />
                    </ListItemButton>
                ))}
            </Collapse>
            <Link to="/admin/fetchOutOfStockProducts" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                <ListItem button>
                    <ListItemText primary="Out Of Stock" />
                </ListItem>
            </Link>

            <Link to="/superadmin/fetchAllUsers" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                <ListItem button>
                    <ListItemText primary="All Users" />
                </ListItem>
            </Link>

            <Link to="/superadmin/activeMembers" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                <ListItem button>
                    <ListItemText primary="Active Users" />
                </ListItem>
            </Link>
            <Link to="/superadmin/inactiveMembers" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                <ListItem button>
                    <ListItemText primary="InActive Users" />
                </ListItem>
            </Link>

            <Link to="/superadmin/getUserQuery" className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
                <ListItem button>
                    <ListItemText primary="User Query" />
                </ListItem>
            </Link>
            <ListItem button onClick={() => handleSheet()}>
                <ListItemText primary="Stores Sheet" />
                {openSheet ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSheet} timeout="auto" unmountOnExit>
                {stores.map((store, index) => (
                    <ListItemButton key={index} component={Link} to={`/superadmin/stores/${store}`} onClick={toggleSecondDrawer(false)}>
                        <ListItemText primary={store} />
                    </ListItemButton>
                ))}
            </Collapse>
            <Link to="/superadmin/logout" className="" style={{ textDecoration: 'none' }} onClick={handleLogout}>
                <ListItem button>
                    <ListItemText primary="Logout" />
                </ListItem>
            </Link>
        </List>
    </div>
) : user?.userType === "Storemanager" ? (
    <div className="store-manager-dashboard h-full w-[300px] p-[40px]">
        <Link to={`/store/allOrders/${user?.store}`} className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
            <ListItem button>
                <ListItemText primary="All Orders" />
            </ListItem>
        </Link>
        <Link to={`/store/allproducts/${user?.store}`} className="" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)}>
            <ListItem button>
                <ListItemText primary="All Products" />
            </ListItem>
        </Link>
        <Link to="" className="" style={{ textDecoration: 'none' }} onClick={handleLogout}>
            <ListItem button>
                <ListItemText primary="Logout" />
            </ListItem>
        </Link>
    </div>
) : (
    <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-200  rounded-lg shadow-md">
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                sx={{ backgroundColor: '#dadada', color: 'black', width: '350px' }}
            >
                <Tab label="Sign In" sx={{ color: 'black', width: '50%' }} />
                <Tab label="Sign Up" sx= {{ color: 'black', width: '50%' }} />
            </Tabs>
            {selectedTab === 0 && (
                <div className='p-5'>
                    <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Email"
                            className="border border-gray-300 px-4 py-2 rounded focus:outline-none"
                            onChange={handleInputChange}
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                placeholder="Minimum 4 Characters"
                                className="border border-gray-300 px-4 py-2 rounded focus:outline-none"
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 py-2"
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white px-4 py-2 rounded focus:outline-none ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'
                                } transition duration-200`}
                            disabled={loading}
                        >
                            {loading ? 'Signin...' : 'Signin'}
                        </button>
                    </form>
                    <Link to="/forget-password" onClick={handleForgetPassword}>Forget Password</Link>
                </div>
            )}
            {selectedTab === 1 && (
                <div className='p-5'>
                    <form className="flex flex-col space-y-4" onSubmit={handleCustomerSubmit}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Email"
                            className="border border-gray-300 px-4 py-2 rounded focus:outline-none"
                            onChange={handleInputChange}
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                placeholder="Minimum 8 Characters"
                                className="border border-gray-300 px-4 py-2 rounded focus:outline-none"
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 py-2"
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white px-4 py-2 rounded focus:outline-none ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'
                                } transition duration-200`}
                            disabled={loading}
                        >
                            {loading ? 'Signup...' : 'Signup'}
                        </button>
                    </form>
                </div>)}
        </div>
    </div>
)}
            </Drawer >

        </>
    );
};



export default Nav;
