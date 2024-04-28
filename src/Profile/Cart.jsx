import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5"; // Assuming you're using Heroicons for icons
import axios from '../config/axios';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import QRCode from 'qrcode';
import Swal from 'sweetalert2';
import { asyncFetchCartProduct, asyncDeleteCheckoutCart } from "../store/actions/userAction";
import rgsLogo from '/rgslogo.jpeg';
import { asyncUpdateStock } from '../store/actions/userAction'
import { asyncCustomerOrder } from '../store/actions/userAction'
import { toast } from "react-toastify";
const generatePDF = async (checkOutCart, user) => {
    try {
        const doc = new jsPDF();

        // Set font styles
        doc.setFont('helvetica');
        doc.setFontSize(12);

        // Add company logo
        const logoWidth = 50;
        const logoHeight = 20;
        // Assuming rgsLogo is defined somewhere in your code
        doc.addImage(rgsLogo, 'JPEG', 10, 10, logoWidth, logoHeight);

        // Add company name and address
        const companyName = 'RGS Grocery';
        const companyAddress = 'IT Park, Gandhinagar, Bhopal';
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 255); // Blue color
        doc.text(companyName, 70, 20);
        doc.setTextColor(0, 0, 0); // Reset text color
        doc.setFontSize(12);
        doc.text(companyAddress, 70, 30);

        // Add customer details
        let userDetails = [
            `Customer: ${user?.name || ''}`,
            `Email: ${user?.email || ''}`,
            `Phone: ${user?.phoneNumber || ''}`,
        ];

        // Convert address array to a formatted string
        if (Array.isArray(user?.address)) {
            const addressString = user.address.join(', '); // Join array elements with a comma
            userDetails.push(`Address: ${addressString}`);
        } else {
            userDetails.push(`Address: ${user?.address || ''}`);
        }

        userDetails.forEach((detail, index) => {
            doc.text(detail, 10, 50 + (index * 10));
        });

        // Add table header
        const header = ['Brand Name', 'Quantity', 'Category', 'Product Name', 'MRP', 'GST', 'CGST', 'Selling Price', 'Total Price'];

        // Add table body
        const tableBody = [];
        if (checkOutCart?.data && checkOutCart?.data?.length > 0) {
            checkOutCart.data.forEach((item) => {
                const product = item?.productId;
                tableBody.push([
                    product?.brand || '',
                    item?.quantity || '',
                    product?.category || '',
                    product?.ProductName || '',
                    `Rs ${product?.MRP || ''}`, // Assuming PurchasePrice is the MRP
                    `${product?.gst || ''}%`, // Assuming gst is the GST
                    `${product?.cgst || ''}%`, // Assuming cgst is the CGST
                    `Rs ${product?.sellingPrice || ''}`, // Assuming sellingPrice is the Selling Price
                    `Rs ${item?.totalPrice || ''}` // Assuming totalPrice is the Total Price
                ]);
            });
        }

        // Add table
        doc.autoTable({
            startY: 100,
            head: [header],
            body: tableBody,
            theme: 'grid',
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 3,
            },
        });

        // Add QR code (Assuming QRCode is defined somewhere in your code)
        const qrDataUrl = await QRCode.toDataURL(JSON.stringify(checkOutCart));
        const qrImageHeight = 40;
        const qrImageWidth = 40;
        const qrX = doc.internal.pageSize.getWidth() - qrImageWidth - 10;
        const qrY = 10;
        doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrImageWidth, qrImageHeight);
        const footerText = 'Thank you for shopping with us!';
        doc.setTextColor(0, 0, 255); // Blue color
        doc.text(footerText, 10, doc.internal.pageSize.getHeight() - 10);
        doc.setTextColor(0, 0, 0); // Reset text color
        const pdfBlob = doc.output('blob');
        return pdfBlob;
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
    }
};



const Cart = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const { checkOutCart, user } = useSelector((state) => state.user);

    useEffect(() => {
        if (user?._id) {
            dispatch(asyncFetchCartProduct(user._id));
        }
    }, [dispatch, user._id]);

    const handlePlaceOrder = () => {
        if (!checkOutCart || !checkOutCart.data || checkOutCart.data.length === 0) {
            toast.success("Checkout cart is empty");
            return;
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCashOnDelivery = async () => {
        try {
            const pdfBlob = await generatePDF(checkOutCart, user);
            dispatch(asyncCustomerOrder({ checkOutCart, PaymentType: "Cash on delivery" }, user._id, user.email, pdfBlob));
            checkOutCart.data.forEach(async (item) => {
                const { productId, quantity } = item;
                const newStock = productId.stock - quantity;
                await dispatch(asyncUpdateStock(productId._id, newStock));
            });
            setShowModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Order Placed!',
                text: 'Your order has been successfully placed.',
            });
        } catch (error) {
            console.error('Error placing order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error placing your order. Please try again later.',
            });
        }
    };

    const handleDeleteItem = (itemId) => {
        dispatch(asyncDeleteCheckoutCart(user?._id, itemId));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">Checkout Cart</h2>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Your Order Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-blue-800">Items:</h3>
                        {checkOutCart?.data && checkOutCart?.data?.length > 0 ? (
                            <ul>
                                {checkOutCart?.data?.map((item, index) => (
                                    <li key={index} className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
                                        <img src={item?.productId?.image?.url} alt={item?.productId?.ProductName} className="h-48 w-full object-cover" />
                                        <div className="p-4">
                                            <h2 className="text-xl font-bold mb-2">{item?.productId?.ProductName}</h2>
                                            <p className="text-gray-700 mb-2">{item?.productId?.description}</p>
                                            <div className="flex justify-between items-center">
                                                <p className="text-gray-800 font-bold"> {item?.productId?.stock}</p>
                                                <h2 className="text-xl font-bold mb-2">{item?.quantity}</h2>
                                                <h2 className="text-xl font-bold mb-2">{item?.totalPrice}</h2>
                                                <p className="text-gray-500">{item?.productId?.category}</p>
                                            </div>
                                            <button onClick={() => handleDeleteItem(item?._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="italic text-gray-500">No items in the cart</p>
                        )}
                    </div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-indigo-800">Total Grand Price:</h3>
                    <p className="text-2xl font-bold text-indigo-900">Rs {checkOutCart?.totalGrandPrice?.toFixed(2)}</p>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handlePlaceOrder}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${(checkOutCart?.data?.totalGrandPrice <= 1) && "opacity-50 cursor-not-allowed"}`}
                        disabled={checkOutCart?.data?.totalGrandPrice <= 1}
                    >
                        Place Order
                    </button>
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
                                <button onClick={handleCashOnDelivery} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                                    Cash on Delivery
                                </button>
                                {/* Add Pay Now button here */}
                                <button onClick={handleCloseModal} className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Cart;
