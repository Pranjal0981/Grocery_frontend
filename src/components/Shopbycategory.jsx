import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { asyncFetchCategorisedPro } from '../store/actions/productAction';
import CategoryProduct from './CategorisedProduct';
export const Shopbycategory = () => {
  const imageContainerRef = useRef(null); // Ref for the image container
const navigate=useNavigate()
  const imageObjects = [
    {
      title: "Spices, Salt & Sugar",
      imageUrl: "/categories/SALT.webp"
    },
    {
      title: "Atta, Rice & Dal",
      imageUrl: "/categories/ATTA.webp"
    },
    {
      title: "Beverages",
      imageUrl: "/categories/BEVERAGES.webp"
    },
    {
      title: "Body & Skin Care",
      imageUrl: "/categories/BODYCARE.webp"
    },
    {
      title: "Chocolates & Sweets",
      imageUrl: "/categories/CHOCOLATES.webp"
    },
    {
      title: "Household & Cleaning",
      imageUrl: "/categories/CLEANING-ITEM.webp"
    },
    {
      title: "Dry Fruits, Nuts & Seeds",
      imageUrl: "/categories/DRY-FRUITS.webp"
    },
    {
      title: "Hair Care",
      imageUrl: "/categories/hAIRCARE.webp"
    },
    {
      title: "Laundry & Dishwash",
      imageUrl: "/categories/LAUNDRY-DISHWASH.webp"
    },
    {
      title: "Oil & Ghee",
      imageUrl: "/categories/OIL-GHEE.webp"
    },
    {
      title: "Oral Care & Wellness",
      imageUrl: "/categories/ORAL-CARE.webp"
    },
    {
      title: "Atta, Rice & Dal",
      imageUrl: "/categories/Pulses-Dal.webp"
    },
    {
      title: "Atta, Rice & Dal",
      imageUrl: "/categories/RICE.webp"
    },
    {
      title: "Snacks & Packed Food",
      imageUrl: "/categories/SNACKS.webp"
    },
    {
      title: "Spices, Salt & Sugar",
      imageUrl: "/categories/SPICES.webp"
    },
    {
      title: "Spices, Salt & Sugar",
      imageUrl: "/categories/SUGER.webp"
    }
  ];
  
  // Function to handle scrolling left
  const scrollLeft = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollBy({
        left: -450,
        behavior: 'smooth'
      });
    }
  };

  // Function to handle scrolling right
  const scrollRight = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollBy({
        left: 350,
        behavior: 'smooth'
      });
    }
  };
  const handleCategoryClick=async(title)=>{
    navigate(`/shopbycategory/${title}`)
    console.log(title)
  }
  return (
    <div>
      <div className='w-full h-auto flex flex-col'>
        <div className="topheading h-[8vh] flex items-center justify-center text-4xl font-regular">
          <h1>SHOP BY CATEGORIES</h1>
        </div>
        <div className="overflow-hidden relative">
          <div className="w-auto h-auto overflow-x-scroll" ref={imageContainerRef}>
            <div className="w-[700vw] imagecategory flex h-[300px] p-[30px] md:w-[250vw] gap-[40px]">
              {imageObjects.map((image, index) => (
                <div key={index} onClick={() => handleCategoryClick(image?.title)} className="w-[500px] imageparent bg-center bg-cover flex flex-col items-center justify-end gap-[20px] bg-no-repeat md:w-[350px] h-[200px] cursor-pointer">
                  <img src={image.imageUrl} alt={image.title} className="w-full h-full" />
                </div>
              ))}

            </div>
          </div>
          {/* Buttons for scrolling */}
          <button className="absolute top-[50%] left-0 transform -translate-y-1/2 bg-gray-400 hover:bg-gray-500 p-3 rounded-full text-gray-800" onClick={scrollLeft}>{'<'}</button>
          <button className="absolute top-[50%] right-0 transform -translate-y-1/2 bg-gray-400 hover:bg-gray-500 p-3 rounded-full text-gray-800" onClick={scrollRight}>{'>'}</button>
        </div>
      </div>
    </div>
  )
}

export const ShopByCategoryProduct=()=>{
  return<>
  <CategoryProduct/>
  </>
};