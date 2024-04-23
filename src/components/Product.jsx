import React from 'react'
import { IoBagHandle } from "react-icons/io5";

function AddToCart() {

    const [count, setCount] = React.useState(1);
    
    const increment = () => {
        setCount(prev => prev + 1);
    }

    const decrement = () => {
        setCount(prev => {
            if(prev <= 1) return 1;
            return prev - 1;
        });
    }

    return (
        <div>
            <div className="flex">
                <div className='border  cursor-pointer text-xl p-2 select-none' onClick={decrement}>-</div>
                <div className='border text-xl p-2 select-none'> {count} </div>
                <div className='border cursor-pointer text-xl p-2 select-none' onClick={increment}>+</div>

                {/* Add to cart button */}

                <div className='cursor-pointer text-2xl p-2 select-none m-1 bg-[#96b416] text-white shadow-lg rounded-md ' onClick={() => {}}><IoBagHandle /></div>
                
            </div>


        </div>
    )
}

function Product({ product }) {
  return (
    <div className="flex flex-col w-[300px] sm:w-[240px] justify-center items-center max-w-screen hover:scale-105 shadow-lg rounded-md mt-2 mb-4">

      <div className="h-[200px] w-[200px] sm:w-[160px] sm:h-[160px] m-2 flex justify-center items-center">
        <img className="object-cover" src={product.imgSrc} alt={product.name} />
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="text-gray-400 font-medium">Uncategorized</div>
      </div>
      <div className="font-bold m-1"> {product.name} </div>
      <div className="m-1"> 
         <s>{product.originalPrice}</s> <span className="text-[#96b416] font-bold"> {product.offerPrice} </span> 
       </div>

        <AddToCart/>

    </div>
  )
}

export default Product
