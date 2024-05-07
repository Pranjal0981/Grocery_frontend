import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchCustomerOrder, asyncReturnRequest, asyncUpdateStock } from "../store/actions/userAction";

const Order = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.admin);

    const [disableReturnButton, setDisableReturnButton] = useState(false);

    // Calculate difference in days between two dates
    const calculateDaysDifference = (date1, date2) => {
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const productIdsToUpdateStock = products?.data?.reduce((acc, order) => {
        order.products.forEach((product) => {
            acc.push(product.productId?._id);
        });
        return acc;
    }, []);

    useEffect(() => {
        dispatch(asyncFetchCustomerOrder(user._id));
    }, [dispatch, user?._id]);

    const handleReturnRequest = (orderId, userId) => {
        dispatch(asyncReturnRequest(orderId, user?._id));
        console.log("Return requested for order:", orderId);

        // Iterate through each order in the products array
        products?.data?.forEach((order) => {
            // Calculate order date and days difference here
            const orderDate = new Date(order.createdAt);
            const currentDate = new Date();
            const daysDifference = calculateDaysDifference(orderDate, currentDate);

            // Iterate through each product in the order
            order.products.forEach(async (product) => {
                // Check if the product ID matches any of the IDs in the array
                if (productIdsToUpdateStock.includes(product.productId?._id)) {
                    try {
                        // Update the stock for the product
                        const newStock = product.productId.stock + product.quantity; // Add returned quantity back to the stock
                         dispatch(asyncUpdateStock(product.productId?._id, newStock));
                        console.log(`Stock updated for product ${product.productId?._id}`);
                    } catch (error) {
                        console.error(`Error updating stock for product ${product.productId?._id}:`, error);
                    }
                }
            });
        });

    };

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
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.data?.map((order) => (
                            <tr key={order._id} className="bg-white">
                                <td className="border px-4 py-2">{order?.status}</td>
                                <td className="border px-4 py-2">{order?.totalGrandPrice}</td>
                                <td className="border px-4 py-2">{order?.userId?.email}</td>
                                <td className="border px-4 py-2">{order?.reqCancellation}</td>
                                <td className="border px-4 py-2">
                                    <ul className="space-y-4">
                                        {order?.products?.map((product) => (
                                            <li key={product?._id}>
                                                <div className="flex items-center space-x-4">
                                                    <div>
                                                        <img src={product?.productId?.image?.url} alt="" className="w-20 h-20 object-cover rounded-lg" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold">{product?.productId?.ProductName}</h3>
                                                        <p className="text-sm text-gray-600">{product?.productId?.description}</p>
                                                        <p className="text-sm text-gray-700">Price: Rs {product?.productId?.sellingPrice}</p>
                                                        <p className="text-sm text-gray-700">Stock: {product?.productId?.stock}</p>
                                                        <p className="text-sm text-gray-700">Quantity: {product?.quantity}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="border px-4 py-2">
                                    {order.reqCancellation === 'Yes' ? (
                                        <button className="bg-gray-300 text-white px-4 py-2 rounded-md" disabled>
                                            Return Requested
                                        </button>
                                    ) : (
                                        <button onClick={() => handleReturnRequest(order._id)} className={`bg-blue-500 text-white px-4 py-2 rounded-md ${disableReturnButton ? 'cursor-not-allowed opacity-50' : ''}`} disabled={disableReturnButton}>
                                            Return Request
                                        </button>
                                    )}
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