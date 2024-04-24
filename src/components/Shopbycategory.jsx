import React from 'react'

const Shopbycategory = () => {
    const imageObjects = [
      {
        title: "Shampoo",
        imageUrl: "https://images.unsplash.com/photo-1624377578244-098e7bf2d55a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Alovera Gel",
        imageUrl: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Perfume",
        imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Face-Creams",
        imageUrl: "https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Scrubs",
        imageUrl: "https://images.unsplash.com/photo-1564594218151-a67498fb2922?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Soap",
        imageUrl: "https://images.unsplash.com/photo-1607006555987-49a12f7c0488?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Aata",
        imageUrl: "https://images.unsplash.com/photo-1577161618325-2663fcfb4636?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Cheese",
        imageUrl: "https://images.unsplash.com/photo-1608611518153-f708d93fc1d8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Rose-Water",
        imageUrl: "https://images.unsplash.com/photo-1601065873952-f999b9a62da7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8"
      },
      {
        title: "Face-wash",
        imageUrl: "https://images.unsplash.com/photo-1609175214983-594001465d18?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ];
      
  return (
    <div>
    <div className='w-full h-[43vh]   flex flex-col  ' >
        <div className="topheading h-[8vh]  flex items-center justify-center text-4xl font-regular">
            <h1>SHOP BY CATEGORIES</h1>
        </div>
        <div className="overflow-scroll">
        <div className="w-[200vw]  h-[30vh]">
        <div className="imagecategory flex  w-full h-[300px] p-[30px] w-[200vw]  gap-[40px] ">
        {imageObjects.map((image, index) => (
        <div key={index} className="imageparent bg-center bg-cover 	flex flex-col items-center justify-end gap-[20px] bg-no-repeat w-[25%]  bg-center" style={{ backgroundImage: `url(${image.imageUrl})` }}>
          <h1 className='text-3xl font-bold 	' >{image.title}</h1>
        </div>
      ))}
        </div>
        </div>
        </div>
      
        
    </div>

    </div>
  )
}

export default Shopbycategory