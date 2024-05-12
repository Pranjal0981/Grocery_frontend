import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryProduct from './components/CategorisedProduct';
import Product from './components/Product';
const FirstComp = () => {
    const [activeTab, setActiveTab] = useState('Show All'); // Set "Show All" as the default active tab

    // Function to handle tab click
    const handleTabClick = (tab) => {
        // Set the active tab
        setActiveTab(tab);

        // Call a function based on the clicked tab
        switch (tab) {
            case 'Show All':
                showAllFunction();
                break;
            case 'New Products':
                newProductsFunction();
                break;
            case 'Trending':
                trendingFunction();
                break;
            default:
                break;
        }
    };

    // Placeholder functions for tab actions
    const showAllFunction = () => {
        console.log('Show All clicked');
    };

    const newProductsFunction = () => {
        console.log('New Products clicked');
    };

    const trendingFunction = () => {
        console.log('Trending clicked');
    };

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center">
            <div className='border-2 w-[90vw] shadow-lg m-4'>
            <Link to="https://reeplayerindia.com/">
                <img src="/Homelogo.png" alt="Home Logo" />
            </Link>
            </div>

            <div className="second w-full ">
                <div className="head flex flex-col items-center justify-center">
                    <h1 className='text-4xl uppercase m-[10px]'>Top Selling Products</h1>
                    

                </div>
            </div>
            <Product/>
        </div>
    );
};

export default FirstComp;
