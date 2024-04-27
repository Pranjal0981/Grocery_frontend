import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchCustomerOrder } from "../store/actions/userAction";

const Order = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.admin);
        useEffect(() => {
        dispatch(asyncFetchCustomerOrder(user._id));
    }, [dispatch, user._id]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Your Order Details</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-800">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Total Grand Price</th>
                            <th className="px-4 py-2">User Email</th>
                            <th className="px-4 py-2">Request Cancellation</th>
                            <th className="px-4 py-2">Product Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.data?.map((order) => (
                            <tr key={order._id}>
                                <td className="border px-4 py-2">{order.status}</td>
                                <td className="border px-4 py-2">{order.totalGrandPrice}</td>
                                <td className="border px-4 py-2">{order.userId.email}</td>
                                <td className="border px-4 py-2">{order.reqCancellation}</td>
                                <td className="border px-4 py-2">
                                    <ul>
                                        {order?.products?.map((product) => (
                                            <li key={product._id} className="mb-4">
                                                <div className="flex items-center">
                                                    <div className="mr-4">
                                                        <img src={product.productId.image.url} alt="" className="w-20 h-20 object-cover rounded-lg" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold">{product.productId.ProductName}</h3>
                                                        <p className="text-sm text-gray-600">{product.productId.description}</p>
                                                        <p className="text-sm text-gray-700">Price: Rs{product.productId.price}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;
