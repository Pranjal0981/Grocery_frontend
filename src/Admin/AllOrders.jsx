import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchOrders, updateOrderStatus } from '../store/actions/adminAction';


const ManageOrder = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.admin);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const ordersPerPage = 2; // Number of orders per page
    // console.log(products.products.checkOutCart.TotalGrandPrice)
    useEffect(() => {
        dispatch(asyncFetchOrders(currentPage));
    }, [dispatch, currentPage]);

    useEffect(() => {
        // Calculate total number of orders and set totalOrders state
        setTotalOrders(products.length);
    }, [products]);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus(orderId, newStatus));
    };

    // Calculate total number of pages based on totalOrders and ordersPerPage
    const totalPages = Math.ceil(totalOrders / ordersPerPage);

    return (
        <>
            <div className="container mx-auto p-4 lg:p-8">
                <h1 className="text-2xl font-semibold mb-4">Manage Orders</h1>
                <p>Total Orders: {totalOrders}</p> {/* Display total number of orders */}

                <div className="overflow-x-auto">
                    <table className="w-full table-auto divide-y divide-gray-200">
                        {/* Table header */}
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Grand Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Products
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cancellation Request
                                </th>

                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment Method
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User Phone
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User Address
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products?.map((product) => (
                                <tr key={product._id}>
                                    {/* Display TotalGrandPrice */}
                                    <td className="px-6 py-4 whitespace-nowrap">{product?.products?.checkOutCart?.TotalGrandPrice}</td>

                                    {/* Display category-wise items */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {['cartItemsMen', 'cartItemsWomen', 'cartItemsKids', 'cartItemsHome'].map((category) => (
                                            (product?.products?.checkOutCart[category] || []).map((item) => (
                                                <div key={item._id} className="bg-white rounded-lg shadow-lg p-4 mb-4">
                                                    {/* Display item details */}
                                                    <p className="text-xl font-semibold">{item.product.brandName}</p>
                                                    <p className="text-gray-700">{item.product.category} - {item.product.subcategory}</p>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <p className="text-gray-600">Price: ${item.product.DiscountedPrice}</p>
                                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                        <p className="text-gray-600">Store: {item.product.Store}</p>
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <p className="text-gray-600">Color: {item.color}</p>
                                                        <p className="text-gray-600">Size: {item.size}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ))}
                                    </td>

                                    {/* Display status dropdown */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            className="border border-gray-300 rounded px-3 py-1"
                                            value={product.status}
                                            onChange={(e) => handleStatusChange(product?._id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="text-gray-600"> {product.reqCancellation}</p>

                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="text-gray-600"> {product.PaymentType}</p>

                                    </td>

                                    {/* Display user information */}
                                    <td className="px-6 py-4 whitespace-nowrap">{product?.products?.checkOutCart?.user?.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product?.products?.checkOutCart?.user?.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product?.products?.checkOutCart?.user?.address}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                {/* Pagination controls */}
                <div className="flex justify-center mt-4">
                    <button
                        className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"

                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                    <p className="ml-2">{currentPage}/{totalPages}</p>
                </div>
            </div>
        </>

    );
};

export default ManageOrder;
