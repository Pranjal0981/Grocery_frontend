import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5"; // Assuming you're using Heroicons for icons
import axios from '../config/axios';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { asyncFetchCartProduct, asyncDeleteCheckoutCart, asyncClearCart } from "../store/actions/userAction";
import rgsLogo from '/rgslogo.jpeg';
import { asyncUpdateStock } from '../store/actions/userAction'
import { asyncCustomerOrder, asyncPayment, asyncUpdateCart,asyncUpdateCartQuantity } from '../store/actions/userAction'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <ClipLoader color="#123abc" loading={true} size={50} />
        </div>
    );
};


const generatePDF = async (checkOutCart, user, orderId, invoiceNumber) => {
    try {
        const GSTNo = "23AAMCR9828E1Z3";
        const FoodLicenseNo = "21424010002578";

        const doc = new jsPDF();
        doc.setFont('helvetica');
        doc.setFontSize(12);

        // Add company logo
        const companyLogo = '/rgslogo.jpeg';
        const imgWidth = 50; // Adjust width as needed
        const imgHeight = 20; // Adjust height as needed
        doc.addImage(companyLogo, 'PNG', 10, 10, imgWidth, imgHeight);

        // Add heading for RGS Grocery with GST and Food License No.
        doc.setFontSize(16);
        doc.text('RGS Grocery', 80, 20, { align: 'left' }); // Adjust position as necessary
        doc.setFontSize(12);
        doc.text(`GST No: ${GSTNo}`, 80, 28, { align: 'left' }); // Adjust position as necessary
        doc.text(`Food License No: ${FoodLicenseNo}`, 80, 36, { align: 'left' }); // Adjust position as necessary
        doc.text(`Invoice Number: ${invoiceNumber}`, 80, 44, { align: 'left' }); // Adjust position as necessary

        // Company details
        const companyDetails = [
            ['Address:', 'IT Park, Gandhinagar, Bhopal, Madhya Pradesh, India, 462033'],
            ['Phone:', '+919244321195'],
            ['Email:', 'inforgsgrocery@gmail.com'],
        ];

        const selectedAddressIndex = user?.selectedAddressIndex ?? 0;
        const addressData = user?.address?.[selectedAddressIndex] || user?.address?.[0];

        const fullAddress = [
            addressData?.addressLine1,
            addressData?.addressLine2,
            addressData?.city,
            addressData?.state,
            addressData?.postalCode
        ].filter(Boolean).join(', ');

        const customerDetails = [
            ['Order ID:', orderId],
            ['Customer:', addressData?.fullName || ''],
            ['Address:', fullAddress || '']
        ];

        // Add company and customer details in a two-column format
        doc.autoTable({
            startY: 50, // Adjust startY to leave space for the heading and logo
            head: [
                [
                    { content: 'Company Details', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Customer Details', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } },
                ]
            ],
            body: companyDetails.map((row, index) => [
                row[0], row[1], customerDetails[index][0], customerDetails[index][1]
            ]),
            theme: 'grid',
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 3,
            },
            headStyles: {
                fillColor: [240, 229, 209], // Light brown header
                textColor: [0, 0, 0], // Black text
                fontStyle: 'bold',
            },
            bodyStyles: {
                fillColor: [255, 255, 255], // White background
                textColor: [0, 0, 0], // Black text
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240] // Alternate row background color
            },
        });

        // Product table
        const header = [
            'Item No.', 'Item Description', 'Qty',
            'MRP', 'Selling Price', 'GST', 'CGST', 'Total'
        ];
        const tableBody = [];
        let totalMRP = 0;
        let totalSellingPrice = 0;

        if (checkOutCart?.products && checkOutCart?.products?.length > 0) {
            checkOutCart.products.forEach((item, index) => {
                const product = item?.productId;
                const totalPrice = item?.totalPrice || 0;
                const gst = product?.gst || 0;
                const cgst = product?.cgst || 0;

                // Calculate tax amounts
                const taxAmount = (product?.sellingPrice * gst) / 100;
                const cgstAmount = (product?.sellingPrice * cgst) / 100;

                // Calculate total price including taxes
                const totalPriceWithTax = product?.sellingPrice + taxAmount + cgstAmount;

                tableBody.push([
                    index + 1,
                    product?.productName || '',
                    item?.quantity || '',
                    `Rs ${product?.MRP || ''}`,
                    `Rs ${product?.sellingPrice || ''}`,
                    `${gst}%`,
                    `${cgst}%`,
                    `Rs ${totalPrice.toFixed(2)}`
                ]);

                // Add to total MRP and selling price
                totalMRP += product?.MRP || 0;
                totalSellingPrice += product?.sellingPrice || 0;
            });
            const totalMRPRow = [
                '', 'Total', '', `Rs ${totalMRP.toFixed(2)}`, '', '', '', `Rs ${checkOutCart.totalGrandPrice.toFixed(2)}`
            ];
            tableBody.push(totalMRPRow);
        }

        // Add product table
        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 10,
            head: [header],
            body: tableBody,
            theme: 'grid',
            styles: {
                font: 'helvetica',
                fontSize: 10,
                cellPadding: 2,
                halign: 'left',
            },
            headStyles: {
                fillColor: [240, 229, 209], // Light brown header
                textColor: [0, 0, 0], // Black text
                fontStyle: 'bold',
            },
            bodyStyles: {
                fillColor: [255, 255, 255], // White background
                textColor: [0, 0, 0], // Black text
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240] // Alternate row background color
            },
        });

        // Add footer
        const footerText = 'Thank you for shopping with us!';
        doc.setFontSize(10);
        doc.text(footerText, 10, doc.internal.pageSize.getHeight() - 10);

        const pdfBlob = doc.output('blob');
        return pdfBlob;
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
    }
};








const Cart = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedStore, setSelectedStore] = useState('');
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);
    const [pdfDataUrl, setPdfDataUrl] = useState('');
    const isCashOnDeliveryProcessing = useSelector(state => state.user.isCashOnDeliveryProcessing);
    const dispatch = useDispatch();
    const { checkOutCart, user, unavailableProduct = [] } = useSelector(state => state.user);
    console.log(checkOutCart)
    console.log(user)

    // console.log(checkOutCart)
    const navigate = useNavigate();
    const [stores, setStores] = useState([]);

    useEffect(() => {
        if (user?._id) {
            dispatch(asyncFetchCartProduct(user._id));
        }
    }, [dispatch, user?._id]);

    useEffect(() => {
        if (user.PreferredStore) {
            setSelectedStore(user.PreferredStore);
        }
    }, [user.PreferredStore]);

    useEffect(() => {
        return () => {
            setIsPaymentLoading(false);
        };
    }, []);

    const generateOrderId = () => {
        return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
    };

    const generateInvoiceNumber = (userId) => {
        // Generate a UUID for the invoice number
        const uuid = uuidv4();

        // Concatenate userId and the UUID to create a unique identifier
        const uniqueIdentifier = user._id?.toString() + uuid;

        // Use a hash function to generate a unique number based on the identifier
        const hash = uniqueIdentifier
            .split('')
            .reduce((acc, char) => {
                acc = ((acc << 5) - acc) + char.charCodeAt(0);
                return acc & acc;
            }, 0);

        // Generate a positive number from the hash
        const positiveHash = Math.abs(hash);

        // Generate an invoice number between 100000 (6 digits) and 99999999 (8 digits)
        const minInvoiceNumber = 100000;
        const maxInvoiceNumber = 99999999;
        const range = maxInvoiceNumber - minInvoiceNumber + 1;

        const invoiceNumber = minInvoiceNumber + (positiveHash % range);

        return invoiceNumber;
    };

    const handlePlaceOrder = async() => {
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

        // Check if any product quantity exceeds stock
        const productIds = checkOutCart?.products?.map(item => item.productId._id);
      await  dispatch(asyncUpdateCart(user._id, selectedStore, productIds)); // Dispatch update with selectedStore

        const outOfStockProducts = checkOutCart.products.filter(item => item.quantity > item.stock);
        if (outOfStockProducts.length > 0) {
            const productNames = outOfStockProducts.map(item => item.productId.productName).join(', ');
            toast.error(`The following products have insufficient stock: ${productNames}`);
            return;
        }

        if (checkOutCart?.totalGrandPrice < 100) {
            toast.error('Minimum order amount is 100.');
            return;
        }

        setShowModal(true);
    };



    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleGeneratePDF = async () => {
        try {
            const orderId = generateOrderId();

            const pdfBlob = await generatePDF(checkOutCart, user, orderId,generateInvoiceNumber());
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfDataUrl(pdfUrl);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    const handleOpenPDF = () => {
        if (pdfDataUrl) {
            window.open(pdfDataUrl, '_blank');
        }
    };

    const handleCashOnDelivery = async () => {
        try {
            const orderId = generateOrderId();
            const invoiceNumber = generateInvoiceNumber();
            const pdfBlob = await generatePDF(checkOutCart, user, orderId, invoiceNumber);

            if (!selectedStore) {
                toast.error('Please select a store before proceeding with payment.');
                return;
            }

            const unavailableStockProducts = checkOutCart.products.filter(item => {
                const stock = item.stock ?? 0;
                return stock <= 0;
            });

            if (unavailableStockProducts.length > 0) {
                const productNames = unavailableStockProducts.map(item => item.productId.productName).join(', ');
                toast.error(`The following products have unavailable stock: ${productNames}`);
                return;
            }

            // Check if any product quantity exceeds stock
            const outOfStockProducts = checkOutCart.products.filter(item => item.quantity > item.stock);
            if (outOfStockProducts.length > 0) {
                const productNames = outOfStockProducts.map(item => item.productId.productName).join(', ');
                toast.error(`The following products have insufficient stock: ${productNames}`);
                return;
            }

            const availableProducts = checkOutCart.products
                .filter(item => {
                    const stock = item.stock ?? 0;
                    return stock > 0 && !unavailableProduct.find(up => up.productId._id === item.productId._id);
                })
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
                email: user.email,
                orderId,
                invoiceNumber
            }, user._id, pdfBlob));

            for (const item of checkOutCart.products) {
                if (!unavailableProduct.find(up => up.productId._id === item.productId._id)) {
                    const stock = item.stock ?? 0; // Ensure stock is defined and is a number
                    if (stock > 0) {
                        const newStock = stock - item.quantity;
                        await dispatch(asyncUpdateStock(item.productId._id, newStock, selectedStore, user._id));
                    }
                }
            }

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
        setIsPaymentLoading(true);
        try {
            const orderId = generateOrderId();
            const invoiceNumber = generateInvoiceNumber();

            const pdfBlob = await generatePDF(checkOutCart, user, orderId, invoiceNumber);

            if (!selectedStore) {
                toast.error('Please select a store before proceeding with payment.');
                setIsPaymentLoading(false);
                return;
            }

            const unavailableStockProducts = checkOutCart.products.filter(item => {
                const stock = item.stock ?? 0;
                return stock <= 0;
            });

            if (unavailableStockProducts.length > 0) {
                const productNames = unavailableStockProducts.map(item => item.productId.productName).join(', ');
                toast.error(`The following products have unavailable stock: ${productNames}`);
                setIsPaymentLoading(false);
                return;
            }

            // Check if any product quantity exceeds stock
            const outOfStockProducts = checkOutCart.products.filter(item => item.quantity > item.stock);
            if (outOfStockProducts.length > 0) {
                const productNames = outOfStockProducts.map(item => item.productId.productName).join(', ');
                toast.error(`The following products have insufficient stock: ${productNames}`);
                setIsPaymentLoading(false);
                return;
            }

            const availableProducts = checkOutCart.products
                .filter(item => {
                    const stock = item.stock ?? 0;
                    return stock > 0 && !unavailableProduct.find(up => up.productId._id === item.productId._id);
                })
                .map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice,
                    store: item.store
                }));

            if (availableProducts.length === 0) {
                toast.error('No available products to place an order.');
                setIsPaymentLoading(false);
                return;
            }
            const token = localStorage.getItem('token')

            const { data } = await axios.get("/api/getkey", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const key = data.key;

            const { data: { order } } = await axios.post("/user/api/checkout", { amount }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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
                        toast.success('Payment successful! Reference ID: ' + reference_id);
                        await dispatch(asyncCustomerOrder({
                            checkOutCart: JSON.stringify(availableProducts),
                            totalGrandPrice: checkOutCart?.totalGrandPrice,
                            paymentType: 'Online Payment',
                            email: user.email,
                            orderId,
                            invoiceNumber
                        }, user._id, pdfBlob));

                        for (const item of checkOutCart.products) {
                            if (!unavailableProduct.find(up => up.productId._id === item.productId._id)) {
                                const stock = item.stock ?? 0; // Ensure stock is defined and is a number
                                if (stock > 0) {
                                    const newStock = stock - item.quantity;
                                    console.log(`Updating stock for ${item.productId._id}: Old stock ${stock}, Quantity ${item.quantity}, New stock ${newStock}`);
                                    await dispatch(asyncUpdateStock(item.productId._id, newStock, selectedStore, user._id));
                                }
                            }
                        }

                        setShowModal(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Placed!',
                            text: 'Your order has been successfully placed.',
                        });

                        navigate('/payment/success', { state: { reference_id: reference_id } });

                    } catch (error) {
                        console.error("Error processing payment:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'There was an error placing your order. Please try again later.',
                        });
                    } finally {
                        setIsPaymentLoading(false);
                    }
                },
                modal: {
                    ondismiss: () => {
                        setIsPaymentLoading(false); // Reset the loading state when the payment window is closed
                    }
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Error in checkout:", error);
            setIsPaymentLoading(false);
        }
    };





    const handleDeleteItem = itemId => {
        dispatch(asyncDeleteCheckoutCart(user?._id, itemId));
    };

    // const handleSelectStore = e => {
    //     setSelectedStore(e.target.value);
    //     const productIds = checkOutCart?.products?.map(item => item.productId._id);
    //     dispatch(asyncUpdateCart(user._id, user?.PreferredStore, productIds));
    // };

    const handleIncrementQuantity = (productId) => {
        console.log(productId)
        const product = checkOutCart.products.find(item => item.productId._id === productId);
        if (product) {
            const newQuantity = product.quantity + 1;
            dispatch(asyncUpdateCartQuantity(user._id, productId, newQuantity));
        }
    };
    const handleDecrementQuantity = (productId) => {
        const product = checkOutCart.products.find(item => item.productId._id === productId);
        if (product && product.quantity > 1) {
            const newQuantity = product.quantity - 1;
            dispatch(asyncUpdateCartQuantity(user._id, productId, newQuantity));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-indigo-800">Your Order Details</h2>
                    {checkOutCart?.products?.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {checkOutCart.products.map((item, index) => (
                                <li key={index} className="py-4 flex">
                                    <img
                                        src={item.productId.image.url}
                                        alt={item.productId.productName}
                                        className="h-24 w-24 object-cover rounded-lg"
                                    />
                                    <div className="ml-4 flex-1">
                                        <div className="flex justify-between">
                                            <h2 className="text-lg font-bold text-gray-800">{item.productId.productName}</h2>
                                            <button
                                                onClick={() => handleDeleteItem(item._id)}
                                                className="text-red-500 hover:text-red-700 font-bold"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <p className="text-gray-600">{item.productId.description}</p>
                                        <div className="flex items-center mt-2">
                                            <p className="text-gray-800">Product Code: {item.productId.productCode}</p>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <p className="text-gray-800">Quantity:</p>
                                            <div className="flex items-center ml-2">
                                                <button
                                                    onClick={() => handleDecrementQuantity(item.productId._id)}
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l"
                                                >
                                                    -
                                                </button>
                                                <span className="px-3">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleIncrementQuantity(item.productId._id)}
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-800 mt-2">Total Price: Rs {item.totalPrice}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="italic text-gray-500">No items in the cart</p>
                    )}
                </div>
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md p-4">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-800">Order Summary</h2>
                    <div className="flex justify-between mb-4">
                        <p className="text-lg font-bold text-gray-800">Total Grand Price: Rs {checkOutCart?.totalGrandPrice}</p>
                        <button
                            onClick={handlePlaceOrder}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${checkOutCart?.totalGrandPrice <= 1 && "opacity-50 cursor-not-allowed"}`}
                            disabled={checkOutCart?.totalGrandPrice <= 1}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showModal && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md max-w-sm">
                        <h2 className="text-xl font-bold mb-4 text-indigo-800">Choose Payment Method</h2>
                        {isCashOnDeliveryProcessing ? (
                            <button
                                className="bg-gray-300 text-white font-bold py-2 px-4 rounded mb-2 w-full"
                                disabled
                            >
                                Loading...
                            </button>
                        ) : (
                            <button
                                onClick={handleCashOnDelivery}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2 w-full"
                            >
                                Cash on Delivery
                            </button>
                        )}
                        <button
                            onClick={() => handleOnlinePayment(checkOutCart?.totalGrandPrice)}
                            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full ${isPaymentLoading && 'opacity-50 cursor-not-allowed'}`}
                            disabled={isPaymentLoading}
                        >
                            {isPaymentLoading ? 'Processing...' : 'Online Payment'}
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="text-gray-600 underline mt-4 w-full text-center"
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



