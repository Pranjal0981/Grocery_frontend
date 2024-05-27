import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5"; // Assuming you're using Heroicons for icons
import axios from '../config/axios';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import QRCode from 'qrcode';
// import { v4 as uuidv4 } from 'uuid4';
import Swal from 'sweetalert2';
import { asyncFetchCartProduct, asyncDeleteCheckoutCart } from "../store/actions/userAction";
import rgsLogo from '/rgslogo.jpeg';
import { asyncUpdateStock } from '../store/actions/userAction'
import { asyncCustomerOrder, asyncPayment, asyncUpdateCart } from '../store/actions/userAction'
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
    const [selectedStore, setSelectedStore] = useState('');

    const dispatch = useDispatch();
    const { checkOutCart, user, unavailableProduct = [] } = useSelector(state => state.user); // Ensure unavailableProduct is an array
    const navigate = useNavigate();
    const [stores, setStores] = useState([]);

    useEffect(() => {
        if (user?._id) {
            dispatch(asyncFetchCartProduct(user._id));
        }
    }, [dispatch, user?._id]);

    useEffect(() => {
        fetch('/stores.json')
            .then(response => response.json())
            .then(data => setStores(data))
            .catch(error => console.error('Error fetching stores:', error));
    }, []);
    const [reference_id, setreferenceId] = useState(null);

    const handlePlaceOrder = () => {
        if (!user.address || user.address.length === 0) {
            toast.error('Please add your details and phone number before placing the order.');
            navigate('/edit-address');
            return;
        }
        if (!checkOutCart || checkOutCart.products.length === 0) {
            toast.success('Checkout cart is empty');
            return;
        }
        if (unavailableProduct?.length > 0) {
            toast.error('Some products are unavailable in the selected store. Please remove them before placing the order.');
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
        console.log(checkOutCart)
        if (!selectedStore) {
            toast.error('Please select a store before proceeding with payment.');
            return;
        }
        const availableProducts = checkOutCart.products
            .filter(item => !unavailableProduct.find(up => up.productId === item.productId._id))
            .map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
                store: item.store
            }));

        if (availableProducts.length === 0) {
            toast.error('No available products to place an order.');
            return;
        }

        await dispatch(asyncCustomerOrder({
            checkOutCart: JSON.stringify(availableProducts),
            totalGrandPrice: checkOutCart?.totalGrandPrice,
            paymentType: 'Cash on delivery',
            email: user.email
        }, user._id, pdfBlob));
        
        for (const item of checkOutCart.products) {
            if (!unavailableProduct.find(up => up.productId === item.productId._id)) {
                const newStock = item.stock - item.quantity;
                await dispatch(asyncUpdateStock(item.productId._id, newStock, selectedStore, user._id));
            }
        }
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
    const handleOnlinePayment = async (amount) => {
        try {
            const pdfBlob = await generatePDF(checkOutCart, user);

            if (!selectedStore) {
                toast.error('Please select a store before proceeding with payment.');
                return;
            }

            const availableProducts = checkOutCart.products
                .filter(item => !unavailableProduct.find(up => up.productId === item.productId._id))
                .map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice,
                    store: item.store
                }));

            if (availableProducts.length === 0) {
                toast.error('No available products to place an order.');
                return;
            }

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
                        alert('Payment success, reference_id',reference_id)
                        await dispatch(asyncCustomerOrder({
                            checkOutCart: JSON.stringify(availableProducts),
                            totalGrandPrice: checkOutCart?.totalGrandPrice,
                            paymentType: 'Online Payment',
                            email: user.email
                        }, user._id, pdfBlob));
                        for (const item of checkOutCart.products) {
                            if (!unavailableProduct.find(up => up.productId === item.productId._id)) {
                                const newStock = item.stock - item.quantity;
                                await dispatch(asyncUpdateStock(item.productId._id, newStock, selectedStore, user._id));
                            }
                        }
                        setShowModal(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Placed!',
                            text: 'Your order has been successfully placed.',
                        });
                    
                        // Navigate to payment success page
                        navigate('/payment/success', { state: { reference_id: reference_id } });

                    } catch (error) {
                        console.error("Error processing payment:", error);
                        console.error('Error placing order:', error);
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




    const handleDeleteItem = itemId => {
        dispatch(asyncDeleteCheckoutCart(user?._id, itemId));
    };

    const handleSelectStore = e => {
        setSelectedStore(e.target.value);
        const productIds = checkOutCart?.products?.map(item => item.productId._id);
        dispatch(asyncUpdateCart(user._id, e.target.value, productIds));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">Checkout Cart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-indigo-800">Your Order Details</h2>
                    {checkOutCart?.products?.length > 0 ? (
                        <ul>
                            {checkOutCart.products.map((item, index) => (
                                <li key={index} className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
                                    <img src={item.productId.image.url} alt={item.productId.productName} className="h-48 w-full object-cover rounded-t-lg" />
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold mb-2 text-indigo-800">{item.productId.productName}</h2>
                                        <p className="text-gray-700 mb-2">{item.productId.description}</p>
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-gray-800 font-bold">Stock: {item.stock}</p>
                                            <p className="text-gray-800 font-bold">Product Code: {item.productId.productCode}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p>Total Price: Rs {item.totalPrice}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-bold mb-2 text-indigo-800">Quantity: {item.quantity}</h2>
                                            <p>Chosen Store: {item.store}</p>
                                        </div>
                                        <button onClick={() => handleDeleteItem(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
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
                <div className="col-span-1 md:col-span-1 lg:col-span-1">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-800">Store Selection</h2>
                    <div className="flex flex-col items-start">
                        <select
                            value={selectedStore}
                            onChange={handleSelectStore}
                            className="border border-gray-300 px-4 py-2 rounded focus:outline-none w-full"
                        >
                            <option value="">Select Store</option>
                            {stores.map((store, index) => (
                                <option key={index} value={store}>{store}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-indigo-800">Order Summary</h3>
                        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                            <p className="text-gray-800 font-bold">Total Grand Price: Rs {checkOutCart?.totalGrandPrice}</p>
                        </div>
                        <button
                            onClick={handlePlaceOrder}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ${checkOutCart?.totalGrandPrice <= 1 && "opacity-50 cursor-not-allowed"}`}
                            disabled={checkOutCart?.totalGrandPrice <= 1}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-indigo-800">Choose Payment Method</h2>
                        <button
                            onClick={handleCashOnDelivery}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 w-full"
                        >
                            Cash on Delivery
                        </button>
                        <button
                            onClick={() => handleOnlinePayment(checkOutCart?.totalGrandPrice)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Online Payment
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 text-gray-600 underline w-full text-center"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};






export default Cart;