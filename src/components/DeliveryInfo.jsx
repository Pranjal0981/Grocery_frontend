import React from 'react';

const DeliveryInformation = () => {
    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">Delivery Information</h2>

            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-indigo-800">Delivery Options</h3>
                <div className="mb-4">
                    <h4 className="text-xl font-bold">Standard Delivery</h4>
                    <p className="text-gray-700">Delivery Time: Within 24-48 business hrs</p>
                </div>
                <div className="mb-4">
                    <h4 className="text-xl font-bold">Same-Day Delivery</h4>
                    <p className="text-gray-700">Delivery Time: Delivered on the same day for orders placed before 12 PM</p>                </div>
               
            </div>


            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-indigo-800">Delivery Times</h3>
                <p className="text-gray-700">Deliveries are made between 9 AM and 9 PM, Monday to Saturday. No deliveries are made on Sundays and public holidays.</p>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-indigo-800">Order Tracking</h3>
                <p className="text-gray-700">Once your order is dispatched, you will receive an email and SMS notification with the tracking details. You can track your order status through our website or app by logging into your account.</p>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-indigo-800">Delivery Instructions</h3>
                <p className="text-gray-700">If you have specific delivery instructions (e.g., leave the package at the doorstep, call upon arrival), please include them at the checkout. Our delivery team will follow these instructions to the best of their ability.</p>
            </div>

           

            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-indigo-800">Delivery Policies</h3>
                
                <div className="mb-4">
                    <h4 className="text-xl font-bold">Damaged Items</h4>
                    <p className="text-gray-700">Please inspect your order upon delivery. If any items are damaged or missing, contact our customer service within 24 hours for a replacement or refund.</p>
                </div>
                <div className="mb-4">
                    <h4 className="text-xl font-bold">Freshness Guarantee</h4>
                    <p className="text-gray-700">We ensure that all perishable items are delivered fresh. If you receive any item that does not meet our freshness standards, please contact customer service for assistance.</p>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-indigo-800">Customer Support</h3>
                <p className="text-gray-700">For any delivery-related queries or issues, you can reach our customer support team at:</p>
                <p className="text-gray-700">Phone: 9244321195</p>
                <p className="text-gray-700">Email: information@rgsgrocery.com</p>
                <p className="text-gray-700">Live Chat: Available on our website from 9 AM to 6 PM, Monday to Saturday.</p>
            </div>

            <p className="text-gray-700 text-center">Thank you for choosing RGS Grocery. We strive to provide the best service and quality products to our valued customers.</p>
        </div>
    );
};

export default DeliveryInformation;
