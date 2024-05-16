import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchOrders, updateOrderStatus } from '../store/actions/adminAction';
import { useParams } from 'react-router-dom';

const ManageOrder = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.admin);
    const { user } = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const ordersPerPage = 2;
    const { store } = useParams();

    useEffect(() => {
        dispatch(asyncFetchOrders(currentPage, store));
    }, [dispatch, currentPage, store]);

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
            {loading ? (
                <div className="text-center mt-4">Loading...</div>
            ) : (
                <>
                    <p className="mb-4">Total Orders: {totalOrders}</p>
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Invoice</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products?.map((product, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{product?.totalGrandPrice}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <ul>
                                                {product?.products?.map((item, idx) => (
                                                    <li key={idx}>
                                                        <strong>Product Name:</strong> {item?.productId?.ProductName}<br />
                                                        <strong>Description:</strong> {item?.productId?.description}<br />
                                                        <strong>Selling Price:</strong> {item?.productId?.sellingPrice}<br />
                                                        <strong>Category:</strong> {item?.productId?.category}<br />
                                                        <strong>Brand:</strong> {item?.productId?.brand}<br />
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
                                                <option value="Cancelled">Cancelled</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{product?.reqCancellation}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{product?.PaymentType}</td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {product?.userId?.address?.map((address, idx) => (
                                                idx === product.userId.selectedAddressIndex && (
                                                    <div key={idx}>
                                                        <div><strong>Name:</strong> {address?.fullName}</div>
                                                        <div><strong>Address Line 1:</strong> {address?.addressLine1}</div>
                                                        <div><strong>Address Line 2:</strong> {address?.addressLine2}</div>
                                                        <div><strong>City:</strong> {address?.city}</div>
                                                        <div><strong>State:</strong> {address?.state}</div>
                                                        <div><strong>Postal Code:</strong> {address?.postalCode}</div>
                                                        <div><strong>Phone:</strong> {address?.phone}</div>
                                                    </div>
                                                )
                                            ))}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <strong>Phone:</strong> {product?.userId?.phone}<br />
                                                <strong>Email:</strong> {product?.userId?.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <strong>Invoice URL:</strong> 
                                                <button
                                                    className="text-blue-500 underline"
                                                    onClick={() => window.open(product?.pdfUrl, '_blank')}
                                                >
                                                    Open PDF
                                                </button>
                                            </div>
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
                </>
            )}
        </div>
    );
};

export default ManageOrder;
