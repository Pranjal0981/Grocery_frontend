import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchCustomerOrder, asyncReturnRequest, asyncUpdateStock } from "../store/actions/userAction";

const Order = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.admin);
    const [disableReturnButton, setDisableReturnButton] = useState(false);

    useEffect(() => {
        if (user?._id) {
            dispatch(asyncFetchCustomerOrder(user?._id));
        }
    }, [dispatch, user?._id]);

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

    const handleReturnRequest = (orderId) => {
        dispatch(asyncReturnRequest(orderId, user?._id));
        setDisableReturnButton(true);

        products?.data?.forEach((order) => {
            const orderDate = new Date(order.createdAt);
            const currentDate = new Date();
            const daysDifference = calculateDaysDifference(orderDate, currentDate);

            order.products.forEach(async (product) => {
                if (productIdsToUpdateStock.includes(product.productId?._id)) {
                    try {
                        const newStock = product.productId.stock + product.quantity;
                        dispatch(asyncUpdateStock(product.productId?._id, newStock));
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
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Total Grand Price</th>
                            <th className="px-4 py-2 border">User Email</th>
                            <th className="px-4 py-2 border">Product Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.data?.map((order) => (
                            <tr key={order._id} className="bg-white">
                                <td className="border px-4 py-2">{order?.status}</td>
                                <td className="border px-4 py-2">{order?.totalGrandPrice}</td>
                                <td className="border px-4 py-2">{order?.userId?.email}</td>
                                <td className="border px-4 py-2">
                                    <ul className="space-y-4">
                                        {order?.products?.map((product) => (
                                            <li key={product?._id} className="border-b py-2">
                                                <div className="flex items-center space-x-4">
                                                    <div>
                                                        <h3 className="text-lg font-semibold">{product?.productId?.productName}</h3>
                                                        <p className="text-sm text-gray-600">{product?.productId?.description}</p>
                                                        <p className="text-sm text-gray-700">Price: Rs {product?.productId?.sellingPrice}</p>
                                                        <p className="text-sm text-gray-700">Quantity: {product?.quantity}</p>
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
