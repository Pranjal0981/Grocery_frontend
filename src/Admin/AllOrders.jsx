import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../config/axios';
import { asyncFetchOrders, updateOrderStatus } from '../store/actions/adminAction'; // Update with your actual action import paths


const ManageOrder = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.admin);
    const { user } = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const ordersPerPage = 5; // Adjust number of orders per page
    const { store } = useParams();
    console.log(store)
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

    const openRazorpay = async (amount) => {
        try {
            const { data } = await axios.get("/api/getkey");
            const key = data.key;

            const { data: { order } } = await axios.post("/user/api/checkout", { amount });

            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "RGS GROCERY",
                description: "razorpay",
                image: "/RGS-New-Logo.webp",
                order_id: order.id,
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone
                },
                notes: { "address": user.address },
                theme: { "color": "#121212" },
                handler: async function (response) {
                    try {
                        const paymentVerificationData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            checkoutCart: checkOutCart
                        };

                        const verificationResponse = await axios.post("/user/api/paymentverification", paymentVerificationData);
                        const { reference_id } = verificationResponse.data;
                        alert('Payment success, reference_id', reference_id);

                        Swal.fire({
                            icon: 'success',
                            title: 'Order Placed!',
                            text: 'Your order has been successfully placed.',
                        });

                        // Navigate to payment success page

                    } catch (error) {
                        console.error("Error processing payment:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'There was an error placing your order. Please try again later.',
                        });
                    }
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Error in checkout:", error);
        }
    };

    // Filtering orders based on search term and selected status
    const filteredOrders = products.filter(order => {
        if (searchTerm && !order?.InvoiceNumber?.toLowerCase().includes(searchTerm?.toLowerCase()) && !order.OrderId?.toLowerCase().includes(searchTerm?.toLowerCase())) {
            return false;
        }
        if (selectedStatus && order.status !== selectedStatus) {
            return false;
        }
        return true;
    });

    return (
        <div className="container mx-auto p-6 lg:p-12">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Manage Orders</h1>
            {loading ? (
                <div className="flex justify-center items-center mt-8">
                    <svg className="animate-spin h-8 w-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <div className="relative w-1/3 mr-4">
                            <input
                                type="text"
                                placeholder="Search by Invoice Number or Order Id"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="absolute right-0 top-0 mt-3 mr-3" onClick={() => setSearchTerm("")}>
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="block border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                            >
                                <option value="">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Paid">Paid</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">Total Orders: {totalOrders}</p>
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="min-w-full bg-white divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Order Id</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Invoice Number</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total Grand Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Products</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Order Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Payment Method</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">User Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Invoice PDF</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders?.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage).map((product, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        <td className="px-6 py-4">{new Date(product?.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{product?.OrderId}</td>
                                        <td className="px-6 py-4">{product?.InvoiceNumber}</td>
                                        <td className="px-6 py-4">{product?.totalGrandPrice}</td>
                                        <td className="px-6 py-4">
                                            <ul className="list-disc list-inside">
                                                {product?.products?.map((item, idx) => (
                                                    <li key={idx} className="mb-2">
                                                        <strong>{item?.productId?.productName}</strong><br />
                                                        <span className="text-sm text-gray-500">{item?.productId?.size}</span><br />
                                                        <span className="text-sm text-gray-500">Rs.{item?.productId?.sellingPrice}</span><br />
                                                        <span className="text-sm text-gray-500">Quantity: {item?.quantity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td><td className="px-6 py-4">
                                            <select
                                                value={product?.status}
                                                onChange={(e) => handleStatusChange(product?._id, e.target.value)}
                                                className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            >
                                                <option value="Cancelled">Cancelled</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Paid">Paid</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">{product?.PaymentType}</td>
                                        <td className="px-6 py-4">
                                            {product?.userId?.address?.map((address, idx) => (
                                                idx === product?.userId?.selectedAddressIndex && (
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
                                            <div>
                                                <strong>
                                                    Email : {product?.userId?.email}
                                                </strong>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product?.PaymentType === 'Cash on delivery' && product.status !== 'Paid' && product?.status !== 'Cancelled' && product?.status !== 'Delivered' && (
                                                <button
                                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    onClick={() => openRazorpay(product?.totalGrandPrice)}
                                                >
                                                    Pay Now
                                                </button>
                                            )}
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
                    <div className="flex justify-between items-center mt-6">
                        <div className="text-sm text-gray-600">
                            Showing {Math.min((currentPage - 1) * ordersPerPage + 1, totalOrders)} - {Math.min(currentPage * ordersPerPage, totalOrders)} of {totalOrders} orders
                        </div>
                        <div className="flex">
                            <button
                                className={`px-3 py-1 bg-gray-300 text-gray-700 rounded mr-2 hover:bg-gray-400 ${currentPage === 1 && 'cursor-not-allowed opacity-50'}`}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <button
                                className={`px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 ${currentPage === totalPages && 'cursor-not-allowed opacity-50'}`}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};



export default ManageOrder;

