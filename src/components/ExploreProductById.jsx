import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSpinner from '../Spinner';
import { useParams } from 'react-router-dom';
import { RiShoppingBagLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { FaRegHeart } from "react-icons/fa";
import { asyncAddToWishlist, asyncAddToCart } from '../store/actions/userAction';
import { asyncExploreById } from '../store/actions/productAction';

const ExploreProductById = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading } = useSelector((state) => state.product);
    console.log(product)
    const { user } = useSelector((state) => state.user);
    const userId = user?._id;
    console.log(product)
   
    const [quantity, setQuantity] = useState(1);
   
    useEffect(() => {
        dispatch(asyncExploreById(id));
    }, [dispatch, id]);

    const handleWishlist = async () => {
        if (product) {
            console.log('Product added to wishlist with ID:', product._id, 'by user with ID:', userId);
            await dispatch(asyncAddToWishlist(userId, { productId: product._id }));
        }
    };

    const handleAddToBag = async () => {
        // Calculate the total price
        const totalPrice = product.DiscountedPrice * quantity;
        await dispatch(asyncAddToCart(userId, { productId: product._id,quantity }));
    };

    if (loading) {
        return <CustomSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-center items-center">
            {product && (
                <>
                    <div className="flex justify-center md:justify-start mb-8 md:mb-0 md:mr-8 max-w-md">
                        <motion.img src={product?.image?.url} className="w-full rounded-lg shadow-lg h-auto md:h-[70vh]" alt={product?.name} whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} />
                    </div>
                    <div className="md:border-l-2 md:border-red-200 md:pl-8">
                        <h1 className="text-3xl font-semibold text-gray-900 mb-4">{product?.ProductName}</h1>
                        <p className="mb-4 text-gray-700">{product.description}</p>
                        <p className="mb-4 text-lg font-medium text-gray-900">MRP: <s>Rs{product?.MRP}</s></p>
                        <p className="mb-4 text-lg font-medium text-gray-900">Quantity {product?.Size}</p>
                        <p className="mb-4 text-lg font-medium text-gray-900"> Rs {product?.sellingPrice}</p>
                        <p className="mb-4 text-lg font-medium text-gray-900">Product Code: {product?.ProductCode}</p>
                        <p className="mb-4 text-lg font-medium text-gray-900">{product?.category}</p>
                        <div className="mb-4 flex items-center">
                        </div>
                        <div className="mb-4">
                            <select className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                                <option value="">Select Quantity</option>
                                {[...Array(10).keys()].map((quantity, index) => (
                                    <option key={index} value={quantity + 1}>{quantity + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <motion.button onClick={handleWishlist} className="btn border border-black px-6 py-3 rounded-md flex items-center justify-center mr-4" whileHover={{ scale: 1.05 }}>
                                <FaRegHeart className="text-red-500 text-2xl" />
                            </motion.button>
                            <motion.button
                                onClick={handleAddToBag}
                                className="btn border border-black px-6 py-3 rounded-md flex items-center justify-center"
                                whileHover={{ scale: 1.05, backgroundColor: "#ED1E79", color: "white" }}>
                                <RiShoppingBagLine className="text-xl mr-2" /> Add to Bag
                            </motion.button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ExploreProductById;
