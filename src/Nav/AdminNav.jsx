import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText'

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton } from '@mui/material';
import { asyncLogoutAdmin } from '../store/actions/adminAction';

const AdminNav = ({ toggleSecondDrawer }) => {
    const { user } = useSelector((state) => state.user);
    const [openOrders, setOpenOrders] = useState(false);
    const [openStore, setOpenStore] = useState(false);
    const [stores,setStores]=useState()
    const dispatch=useDispatch()
    useEffect(() => {
        // Fetch the list of stores from the JSON file
        fetch('/stores.json')
            .then((response) => response.json())
            .then((data) => setStores(data))
            .catch((error) => console.error('Error fetching stores:', error));
    }, []);
    
    const handleStoreChange = (store) => {
        setSelectedStore(store);
    }
    const handleOrderClick = () => {
        setOpenOrders(!openOrders);
    };

    const handleStoreClick = () => {
        setOpenStore(!openStore);
    };

    const handleLogout = async (e) => {
        e.preventDefault()
        if (user?.userType === 'Admin') {
            await dispatch(asyncLogoutAdmin());
            toggleSecondDrawer(false)

        }
        navigate('/')

    }
    const { permissions } = user || {};

    return (
            <div className="admin-dashboard h-full w-[300px] p-[40px]">
                <List className='flex flex-col w-full gap-[20px]'>
                    <h1 className='text-center'>ADMIN ACCOUNT</h1>

                    {permissions?.canUploadProducts && (
                        <Link to="/admin/upload-products" style={{ textDecoration: 'none' }} >
                            <ListItem button>
                            <ListItemText primary="Upload Products" onClick={toggleSecondDrawer(false)}/>
                            </ListItem>
                        </Link>
                    )}

                    {permissions?.canViewOrders && (
                        <>
                            <ListItem button onClick={handleOrderClick}>
                                <ListItemText primary="All Orders" />
                                {openOrders ? <ExpandLess /> : <ExpandMore /> }
                            </ListItem>
                            <Collapse in={openOrders} timeout="auto" unmountOnExit>
                                {stores?.map((store, index) => (
                                    <ListItemButton key={index} component={Link} to={`/admin/allOrders/${store}`} onClick={toggleSecondDrawer(false)}>
                                        <ListItemText primary={store} />
                                    </ListItemButton>
                                ))}
                            </Collapse>
                        </>
                    )}

                    {permissions?.canFetchOutOfStockProducts && (
                    <Link to="/admin/fetchOutOfStockProducts" style={{ textDecoration: 'none' }} onClick={toggleSecondDrawer(false)} >
                            <ListItem button>
                                <ListItemText primary="Out Of Stock" />
                            </ListItem>
                        </Link>
                    )}

                    {permissions?.canManageStores && (
                        <>
                            <ListItem button onClick={handleStoreClick}>
                                <ListItemText primary="Stores" />
                                {openStore ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openStore} timeout="auto" unmountOnExit>
                                {stores?.map((store, index) => (
                                    <ListItemButton key={index} component={Link} to={`/stores/fetchProducts/${store}`} onClick={toggleSecondDrawer(false)}>
                                        <ListItemText primary={store} />
                                    </ListItemButton>
                                ))}
                            </Collapse>
                        </>
                    )}

                <Link to="/admin/logout" style={{ textDecoration: 'none' }} onClick={handleLogout} >
                        <ListItem button>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </Link>
                </List>
            </div>
        )
    
};

export default AdminNav;
