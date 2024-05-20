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
import { asyncCustomerOrder, asyncPayment } from '../store/actions/userAction'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const generatePDF = async (checkOutCart, user) => {
    try {
        console.log(checkOutCart)
        const link = "https://reeplayerindia.com/"; // Replace this with your desired link
        const GSTNo = "23AAMCR9828E1Z3";
        const FoodLicenseNo = "21424010002578";

        const doc = new jsPDF();
        doc.setFont('helvetica');
        doc.setFontSize(12);

        // Add company logo
        const logoWidth = 50;
        const logoHeight = 20;
        doc.addImage(rgsLogo, 'JPEG', 10, 10, logoWidth, logoHeight);

        // Company details
        const companyName = 'RGS Grocery';
        const companyAddress = 'IT Park, Gandhinagar, Bhopal';
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 255); // Blue color
        doc.text(companyName, 70, 20);
        doc.setTextColor(0, 0, 0); // Reset text color
        doc.setFontSize(12);
        doc.text(companyAddress, 70, 30);

        // Add GST and Food License Numbers
        doc.setFontSize(10);
        doc.text(`GST No: ${GSTNo}`, 70, 40);
        doc.text(`Food License No: ${FoodLicenseNo}`, 70, 45);

        // Address details
        console.log(user)
        const addressHeader = ['Name', 'Address Line 1', 'Address Line 2', 'City', 'State', 'Postal Code', 'Phone Number'];
        const selectedAddressIndex = user?.selectedAddressIndex ?? 0; // Default to 0 if undefined
        const addressData = user?.address?.[selectedAddressIndex] || user?.address?.[0]; // Fallback to the first address if the index is out of bounds

        if (addressData) {
            const addressRows = [
                addressData.fullName || '',
                addressData.addressLine1 || '',
                addressData.addressLine2 || '',
                addressData.city || '',
                addressData.state || '',
                addressData.postalCode || '',
                user.phone || '' // Assuming phone is not part of the address object but of the user object
            ];
            const addressTable = [addressHeader, addressRows];

            // Add address table
            doc.autoTable({
                startY: 50,
                head: [addressTable[0]],
                body: [addressTable[1]],
                theme: 'plain',
                styles: {
                    font: 'helvetica',
                    fontSize: 10,
                    cellPadding: 3,
                },
            });
        }

        // Add customer details
        const userDetails = [
            `Customer: ${user?.firstName || ''} ${user?.lastName || ''}`,
            `Email: ${user?.email || ''}`,
            `Phone: ${user?.phone || ''}`,
        ];

        userDetails.forEach((detail, index) => {
            doc.text(detail, 10, 110 + (index * 10));
        });

        // Product table
        const header = ['Brand Name', 'Quantity', 'Category', 'Product Name', 'MRP', 'GST', 'CGST', 'Selling Price', 'Total Price'];
        const tableBody = [];
        if (checkOutCart?.products && checkOutCart?.products?.length > 0) {
            checkOutCart.products.forEach((item) => {
                const product = item?.productId;
                tableBody.push([
                    product?.brand || '',
                    item?.quantity || '',
                    product?.category || '',
                    product?.productName || '',
                    `Rs ${product?.MRP || ''}`, // Assuming MRP is the MRP
                    `${product?.gst || ''}%`, // Assuming gst is the GST
                    `${product?.cgst || ''}%`, // Assuming cgst is the CGST
                    `Rs ${product?.sellingPrice || ''}`, // Assuming sellingPrice is the Selling Price
                    `Rs ${item?.totalPrice || ''}` // Assuming totalPrice is the Total Price
                ]);
            });
        }

        // Add product table
        doc.autoTable({
            startY: 150, // Adjust startY based on the space occupied by user details
            head: [header],
            body: tableBody,
            theme: 'grid',
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 3,
            },
        });

        // Add total grand price
        const totalGrandPriceY = 150 + (tableBody.length * 20) + (userDetails.length * 10);
        doc.setFontSize(12);
        doc.text(`Total Grand Price: Rs ${checkOutCart.totalGrandPrice.toFixed(2)}`, 10, totalGrandPriceY);

        // Add QR code
        const qrDataUrl = await QRCode.toDataURL(link);
        const qrImageHeight = 40;
        const qrImageWidth = 40;
        const qrX = doc.internal.pageSize.getWidth() - qrImageWidth - 10;
        const qrY = 10;
        doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrImageWidth, qrImageHeight);

        // Add footer
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
}



const Cart = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const { checkOutCart, user } = useSelector((state) => state.user);
    console.log(checkOutCart)

    useEffect(() => {
        if (user?._id) {
            dispatch(asyncFetchCartProduct(user._id));
        }
    }, [dispatch, user._id]);
const navigate=useNavigate()
    const handlePlaceOrder = () => {
        if (!user.address || user.address.length === 0) {
            toast.error("Please add your details and phone number before placing the order.");
            navigate('/edit-address')
           
        }
        if (!checkOutCart || checkOutCart.products.length === 0) {
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
            console.log(checkOutCart)
            const pdfBlob = await generatePDF(checkOutCart, user);
            dispatch(asyncCustomerOrder({ checkOutCart, PaymentType: "Cash on delivery" }, user._id, user.email, pdfBlob));
            checkOutCart.products.forEach(async (item) => {
                const { productId, quantity } = item;
console.log(item)
                const newStock = item.stock - item.quantity;
                console.log(newStock)
                await dispatch(asyncUpdateStock(productId._id, newStock,item?.store,user?._id));
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
    
    const handleOnlinePayment = async (amount,checkOutCart )=>{

        console.log(checkOutCart)
        console.log(amount)
        const products = checkOutCart?.products?.map((item) => item?.productId?.productName?.trim()).join(', ');
        console.log("🚀 ~ handleOnlinePayment ~ products:", products)
        dispatch(asyncPayment(user?._id, { amount, products }));
        // alert("Please try another method")
    }

    const handleDeleteItem = (itemId) => {
        dispatch(asyncDeleteCheckoutCart(user?._id, itemId));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">Checkout Cart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-indigo-800">Your Order Details</h2>
                    {checkOutCart?.products && checkOutCart?.products?.length > 0 ? (
                        <ul>
                            {checkOutCart.products?.map((item, index) => (
                                <li key={index} className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
                                    <img src={item?.productId?.image?.url} alt={item?.productId?.ProductName} className="h-48 w-full object-cover rounded-t-lg" />
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold mb-2 text-indigo-800">{item?.productId?.ProductName}</h2>
                                        <p className="text-gray-700 mb-2">{item?.productId?.description}</p>
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-gray-800 font-bold">Stock: {item?.stock}</p>
                                            <p className="text-gray-800 font-bold">Product Code: {item?.productId?.productCode}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p>Total Price: Rs {(item?.totalPrice)}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-bold mb-2 text-indigo-800">Quantity:{item?.quantity}</h2>
                                            <p>Chosen Store: {(item?.store)}</p>
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
                    <div className="mt-8 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-indigo-800">Total Grand Price:</h3>
                        <p>Total Grand Price: Rs {(checkOutCart?.totalGrandPrice)}</p>
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
                                    <button onClick={() => handleOnlinePayment(checkOutCart?.totalGrandPrice, checkOutCart)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" id="ebz-checkout-btn">
                                    Online Payment
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
        </div>
    );

};


export default Cart;
