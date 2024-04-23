import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <div className="w-full h-auto">
            <Link to="https://reeplayerindia.com/">
                <img src="../public/HomeLogo.png" alt="Home Logo" />
            </Link>

            <div className="second w-full h-[50vh]">
                <div className="head flex flex-col items-center justify-center">
                    <h1 className='bg-orange-200 p-[6px] rounded-full'>We Love them</h1>
                    <h1 className='text-4xl uppercase mt-[10px]'>Top Selling Products</h1>
                    <div className="tabs flex gap-[20px]">
                        <h1
                            onClick={() => handleTabClick('Show All')}
                            className={`tab rounded-full px-4 py-2 ${activeTab === 'Show All' ? 'bg-lime-500 text-white' : 'text-black'}`}
                        >
                            Show All
                        </h1>

                        <h1
                            onClick={() => handleTabClick('New Products')}
                            className={`tab rounded-full px-4 py-2 ${activeTab === 'New Products' ? 'bg-lime-500 text-white' : 'text-black'}`}
                        >
                            New Products
                        </h1>

                        <h1
                            onClick={() => handleTabClick('Trending')}
                            className={`tab rounded-full px-4 py-2 ${activeTab === 'Trending' ? 'bg-lime-500 text-white' : 'text-black'}`}
                        >
                            Trending
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstComp;
