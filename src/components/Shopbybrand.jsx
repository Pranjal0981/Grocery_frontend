import React from 'react';
import {useNavigate} from 'react-router-dom'
const Shopbycategory = () => {
  const navigate=useNavigate()
    const imageObjects = [
        {
            imageUrl: "https://rgsgrocery.com/wp-content/uploads/2024/04/AMUL.png",
            title: "Amul"
        },
        {
            imageUrl: "https://rgsgrocery.com/wp-content/uploads/2024/04/BAJAJ.png",
            title: "Bajaj"
        },
        {
            imageUrl: "https://rgsgrocery.com/wp-content/uploads/2024/04/BEARDO-1.png",
            title: "Beardo"
        },
        {
            imageUrl: "https://rgsgrocery.com/wp-content/uploads/2024/04/BEIERSDORF.png",
            title: "Beiersdorf"
        },
        {
            imageUrl: "https://rgsgrocery.com/wp-content/uploads/2024/04/BELLAVITA.png",
            title: "Bellavita"
        },
        {
            imageUrl: "https://rgsgrocery.com/wp-content/uploads/2024/04/BRITANIA.png",
            title: "Britannia"
        },
        {
            imageUrl: "https://rgsgrocery.com/wp-content/uploads/2024/04/DABUR-1.png",
            title: "Dabur"
        },
        {
            imageUrl: "https://rgsgrocery.com/wp-content/uploads/2024/04/DENVER.png",
            title: "Denver"
        },
        {
            imageUrl: "https://rgsgrocery.com/wp-content/uploads/2024/04/EMAMI.png",
            title: "Emami"
        },
        {
            imageUrl: "https://rgsgrocery.com/wp-content/uploads/2024/04/GODREJ.png",
            title: "Godrej"
        },
        {
            imageUrl: "https://rgsgrocery.com/wp-content/uploads/2024/04/HUL.png",
            title: "HUL"
        }
    ];
  const handleImageClick = (title) => {
    // Logic to handle navigation to the specific brand
    console.log(`Clicked on brand: ${title}`);
    navigate(`/brand/${title}`)
    
  };
  return (
    <div className="w-full h-auto flex flex-col">
      <div className="topheading h-16 flex items-center justify-center text-4xl font-regular">
        <h1>SHOP BY BRAND</h1>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="imagecategory flex p-4 gap-4" style={{ width: `${imageObjects.length * 200}px` }}>
          {imageObjects.map((image, index) => (
            <div key={index} className="imageparent flex flex-col items-center justify-end gap-2 bg-cover bg-no-repeat w-40 h-40 cursor-pointer" style={{ backgroundImage: `url(${image.imageUrl})` }} onClick={() => handleImageClick(image.title)}>
              <h1 className="text-lg font-bold">{image.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Shopbycategory;
