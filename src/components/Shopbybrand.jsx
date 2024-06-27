import gsap from 'gsap/all';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const Shopbycategory = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);

  const imageObjects = [
    {
      imageUrl: "https://i.pinimg.com/originals/89/5c/f4/895cf4457b3c075b2d153f44f2700f1b.png",
      title: "Amul"
    },
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHy0X4A6NfkdqRVXeP2RRGmPrOPcXlYgf51Q&s",
      title: "Bajaj"
    },
    {
      imageUrl: "https://itshemp.in/wp-content/uploads/2023/03/Beardo_Logo_ItsHemo.webp",
      title: "Beardo"
    },
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRHc-wQTGbvJZ9nWLwZcJsWgatIzcC6Tr5DA&s",
      title: "Beiersdorf"
    },
    {
      imageUrl: "https://www.amanoramall.com/assets/images/brand/BYl89zb1NsgaDYBS6d5inEQgEBESes.jpg",
      title: "Bellavita"
    },
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT-hEFrp3V3rHcuzibBRJ4HuyjXeta9K2S4w&s",
      title: "Britannia"
    },
    {
      imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/52508e18338079.562c7d1a0271c.jpg",
      title: "Dabur"
    },
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZheY5zb6Ay5J8IC0QDido3mv6OhErOVllQQ&s",
      title: "Denver"
    },
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZJHQuiDJhV1ek-v2N8uHq8pZDwUNgwOlZng&s",
      title: "Emami"
    },
    {
      imageUrl: "https://static.vecteezy.com/system/resources/previews/020/336/120/non_2x/godrej-logo-godrej-icon-free-free-vector.jpg",
      title: "Godrej"
    },
    {
      imageUrl: "https://www.hul.co.in/content-images/92ui5egz/production/ba0e8bde098aa99fc24c647fe3cb85affb7243bd-1920x1080.jpg?rect=0,36,1920,1008&w=1200&h=630&fm=jpg",
      title: "Hindustan Unilever"
    }
  ];

  const handleImageClick = (title) => {
    // Logic to handle navigation to the specific brand
    console.log(`Clicked on brand: ${title}`);
    navigate(`/brand/${title}`);
  };
  useEffect(() => {
    gsap.from(headingRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "easeInOut",
    });
  }, []);
  return (
    <div className="w-full h-auto flex flex-col">
      <div
        ref={headingRef}
        className="topheading h-16 flex items-center justify-center text-4xl font-bold text-white bg-blue-500 shadow-md rounded-lg mb-4"
      >
        <h1>SHOP BY BRAND</h1>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="imagecategory flex p-4 gap-4">
          {imageObjects.map((image, index) => (
            <div
              key={index}
              className="imageparent flex flex-col items-center justify-end gap-2 bg-contain bg-no-repeat w-40 h-40 cursor-pointer rounded-lg shadow-md"
              style={{ backgroundImage: `url(${image.imageUrl})` }}
              onClick={() => handleImageClick(image.title)}
            >
              <h1 className="text-lg font-bold text-white bg-black bg-opacity-50 rounded-md px-2 py-1">{image.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shopbycategory;
