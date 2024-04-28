import React from 'react';

const CustomerCare = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Customer Care</h1>
            <p className="text-lg mb-6">
                Welcome to RGS Grocery's Customer Care page. We're here to assist you with any questions or concerns you may have.
                Below are some common topics that you might find helpful:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-gray-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-2">Order Support</h2>
                    <p className="text-base text-gray-700">
                        Need assistance with your order? Our support team is ready to help. Contact us for order tracking, delivery inquiries, or any issues with your purchase.
                    </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-2">Product Information</h2>
                    <p className="text-base text-gray-700">
                        Have questions about our products? From nutritional information to ingredients, we're here to provide you with the details you need to make informed decisions about your purchases.
                    </p>
                </div>
            </div>
            <div className="mt-8 border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-2">Feedback and Suggestions</h2>
                <p className="text-base text-gray-700">
                    Your feedback is valuable to us! Whether you have suggestions for improving our services or want to share your shopping experience, we welcome your input. Reach out to us and let us know how we can better serve you.
                </p>
            </div>
        </div>
    );
}

export default CustomerCare;
