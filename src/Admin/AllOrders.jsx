import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchOrders, updateOrderStatus } from '../store/actions/adminAction';

const ManageOrder = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.admin);
    const { user } = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const ordersPerPage = 2; // Number of orders per page

    useEffect(() => {
        dispatch(asyncFetchOrders(currentPage, user?.store));
    }, [dispatch, currentPage, user?.store]);

    useEffect(() => {
        setTotalOrders(products?.length);
    }, [products]);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus(orderId, newStatus, user?.store));
    };

    const totalPages = Math.ceil(totalOrders / ordersPerPage);

    return (
        <div className="container mx-auto p-4 lg:p-8">
            <h1 className="text-2xl font-semibold mb-4">Manage Orders</h1>
            <p>Total Orders: {totalOrders}</p>

            <div className="overflow-x-auto">
                <table className="w-full table-auto divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Grand Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancellation Request</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products?.map((product, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{product.totalGrandPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <ul>
                                        {product.products.map((item, idx) => (
                                            <li key={idx}>
                                                <strong>Product Name:</strong> {item.productId.ProductName}<br />
                                                <strong>Description:</strong> {item.productId.description}<br />
                                                <img src={item.productId.image.url} alt="" className="w-16 h-16 object-cover rounded-lg" />
                                                <strong>Price:</strong> {item.productId.price}<br />
                                                <strong>Category:</strong> {item.productId.category}<br />
                                                <strong>Brand:</strong> {item.productId.brand}<br />
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={product.status}
                                        onChange={(e) => handleStatusChange(product._id, e.target.value)}
                                        className="block w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>                                <td className="px-6 py-4 whitespace-nowrap">{product.reqCancellation}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.PaymentType}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>Phone: {product.userId.phone}</div>
                                    <div>Email: {product.userId.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.userId.address.map((address, index) => (
                                            <div key={index}>
                                                <div>Name: {address.name}</div>
                                                <div>Address Line 1: {address.addressLine1}</div>
                                                <div>Address Line 2: {address.addressLine2}</div>
                                                <div>City: {address.city}</div>
                                                <div>State: {address.state}</div>
                                                <div>Postal Code: {address.postalCode}</div>
                                                <div>Country: {address.country}</div>
                                            </div>
                                        ))}
                                    </td>
                                 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                <p className="ml-2">{currentPage}/{totalPages}</p>
            </div>
        </div>
    );
};

export default ManageOrder;