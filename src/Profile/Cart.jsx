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
import {asyncUpdateStock} from '../store/actions/userAction'
import { asyncCustomerOrder } from '../store/actions/userAction'
// const generatePDF = async (checkOutCart, user) => {
//     try {
//         const doc = new jsPDF();

//         // Set font styles
//         doc.setFont('helvetica');
//         doc.setFontSize(12);

//         // Add company logo
//         const logoWidth = 50;
//         const logoHeight = 20;
//         doc.addImage(rgsLogo, 'JPEG', 10, 10, logoWidth, logoHeight);

//         // Add company name and address
//         const companyName = 'RGS Bindas';
//         const companyAddress = 'IT Park, Gandhinagar, Bhopal';
//         doc.setFontSize(16);
//         doc.setTextColor(0, 0, 255); // Blue color
//         doc.text(companyName, 70, 20);
//         doc.setTextColor(0, 0, 0); // Reset text color
//         doc.setFontSize(12);
//         doc.text(companyAddress, 70, 30);

//         // Add customer details
//         const userDetails = [
//             `Customer: ${user?.name || ''}`,
//             `Email: ${user?.email || ''}`,
//             `Phone: ${user?.phoneNumber || ''}`,
//             `Phone: ${user?.address || ''}`,
//         ];
//         userDetails.forEach((detail, index) => {
//             doc.text(detail, 10, 50 + (index * 10));
//         });

//         // Define and populate tableBody with data from checkOutCart
//         const tableBody = [];
//         for (const category in checkOutCart) {
//             if (checkOutCart.hasOwnProperty(category) && Array.isArray(checkOutCart[category])) {
//                 for (const item of checkOutCart[category]) {
//                     tableBody.push([
//                         item.product.brand || '',
//                         item.quantity || '',
//                         item.product.category || '',
//                         item.product.subcategory || '',
//                         `Rs ${item.product.GST}`, // Format price
//                         item.size || '',
//                         `Rs ${item?.totalPrice}` // Format total price
//                     ]);
//                 }
//             }
//         }

//         // Add table header
//         const header = [['Brand Name', 'Color', 'Quantity', 'Category', 'Subcategory', 'Discounted Price', 'GST', 'Size', 'Total Price']];

//         // Add table
//         doc.autoTable({
//             startY: 100,
//             head: header,
//             body: tableBody,
//             theme: 'grid', // Apply grid theme to the table
//             styles: {
//                 font: 'helvetica',
//                 fontSize: 10,
//                 cellPadding: 3,
//             },
//         });

//         // Add QR code
//         const qrDataUrl = await QRCode.toDataURL(JSON.stringify(checkOutCart));
//         const qrImageHeight = 40;
//         const qrImageWidth = 40;
//         const qrX = doc.internal.pageSize.getWidth() - qrImageWidth - 10; // Right side padding
//         const qrY = 10; // Top side padding
//         doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrImageWidth, qrImageHeight);

//         // Add footer
//         const footerText = 'Thank you for shopping with us!';
//         doc.setTextColor(0, 0, 255); // Blue color
//         doc.text(footerText, 10, doc.internal.pageSize.getHeight() - 10);
//         doc.setTextColor(0, 0, 0); // Reset text color

//         // Convert the PDF content to a Blob
//         const pdfBlob = doc.output('blob');
//         console.log(pdfBlob)
//         // Return the Blob representing the PDF content
//         return pdfBlob;
//     } catch (error) {
//         console.error("Error generating PDF:", error);
//         throw error; // Rethrow the error for handling elsewhere
//     }
// };



const Cart = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const { checkOutCart, user } = useSelector((state) => state.user);

   console.log(checkOutCart)

    const handlePlaceOrder = () => {
        // Check if checkout cart is empty
        if (!checkOutCart || !checkOutCart.data || checkOutCart.data.length === 0) {
            console.log("Cannot place order: Checkout cart is empty");
            return;
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCashOnDelivery = async () => {
        try {
            console.log('clicked');
            // const pdfBlob = await generatePDF(checkOutCart, user)
            console.log(checkOutCart);
            dispatch(asyncCustomerOrder({ checkOutCart, PaymentType: "Cash on delivery" },user._id));
            checkOutCart.data.forEach(async (item) => {
                const { productId, quantity } = item;
                const newStock=productId.stock-quantity
                await dispatch(asyncUpdateStock(productId._id, newStock)); // Assuming productId._id contains the product ID
            });         
            setShowModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Order Placed!',
                text: 'Your order has been successfully placed.',
            });
            // await generatePDF(checkOutCart)
        } catch (error) {
            console.error('Error placing order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error placing your order. Please try again later.',
            });
        }
    };

    console.log(user)
    useEffect(() => {
        dispatch(asyncFetchCartProduct(user?._id));

    }, [dispatch, user?._id]);

    const handleDeleteItem = (itemId) => {
        console.log("Deleting item with ID:", itemId);
        dispatch(asyncDeleteCheckoutCart(user?._id, itemId));
    };



    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">Checkout Cart</h2>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Your Order Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Combined Items */}
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

                {/* Total Grand Price */}
                <div className="mt-8 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-indigo-800">Total Grand Price:</h3>
                    <p className="text-2xl font-bold text-indigo-900">Rs {checkOutCart?.totalGrandPrice?.toFixed(2)}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handlePlaceOrder}
                        // disabled={!checkOutCart || checkOutCart.data.length === 0}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${(!checkOutCart?._id)}`}
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
                                <button onClick={() => checkoutHandler(checkOutCart?.TotalGrandPrice?.toFixed(2))} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Pay Now
                                </button>
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


}
export default Cart;
