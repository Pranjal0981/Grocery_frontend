import React, { useEffect } from "react";
import { asyncFetchWishlist, asyncDeleteFromWishlist } from "../store/actions/userAction";
import { useSelector, useDispatch } from 'react-redux';
import { IoIosClose } from "react-icons/io";

const Wishlist = () => {
    const dispatch = useDispatch();
    const { user, wishlist } = useSelector((state) => state.user);
    useEffect(() => {
        if (user?._id) {
            dispatch(asyncFetchWishlist(user?._id));
        }
    }, [dispatch, user?._id]);

    const handleDeleteProduct = (productId, productType) => {
        dispatch(asyncDeleteFromWishlist(user?._id, productId));
    };
const wishlistLength=wishlist?.length ||0

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-6">My Wishlist ({wishlistLength})</h1>
            {wishlistLength === 0 ? (
                <div className="text-center text-lg text-gray-500">No items in the wishlist</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist?.map(product => (
                        <div key={product?._id} className="bg-white p-4 rounded-lg shadow-md relative">
                            <img src={product?.image?.url} alt={product?.brand} className="w-full h-48 object-cover mb-4" />
                            <h2 className="text-lg font-semibold">{product?.brand}</h2>
                            <div className="flex justify-end mt-2">
                                <button onClick={() => handleDeleteProduct(product?._id)} className="absolute top-[0px] bg-blue-100 rounded-full text-3xl right-[0px]  hover:text-red-700">
                                    <IoIosClose />
                                </button>
                            </div>
                        </div>
                    ))}
                
                </div>
            )}
        </div>
    );
};

export default Wishlist;
