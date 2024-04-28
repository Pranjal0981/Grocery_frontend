import React from 'react';

const ReturnPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Return Policy</h1>
            <div className="bg-white shadow-md rounded-lg p-8">
                <p className="text-lg mb-6">
                    At RGS Grocery, we want to ensure that you are completely satisfied with your purchase.
                    If for any reason you are not satisfied with a product you've purchased from us,
                    you may be eligible for a return or exchange subject to the following conditions:
                </p>
                <ul className="list-disc pl-6 mb-6">
                    <li className="text-base mb-3">
                        Items must be returned within <span className="font-semibold">2 days</span> of delivery.
                    </li>
                    <li className="text-base mb-3">
                        Items must be <span className="font-semibold">unused</span>, <span className="font-semibold">unopened</span>, and in their original packaging.
                    </li>
                    <li className="text-base mb-3">
                        Perishable items such as <span className="font-semibold">fruits</span>, <span className="font-semibold">vegetables</span>, and <span className="font-semibold">dairy products</span> are not eligible for return.
                    </li>
                    <li className="text-base mb-3">
                        Returns are subject to inspection and approval by our team.
                    </li>
                </ul>
                <p className="text-lg mb-6">
                    To initiate a return, please contact our customer support team with your order details
                    and the reason for the return. Our team will guide you through the return process
                    and provide further instructions.
                </p>
                <p className="text-lg">
                    If your return is approved, we will process a refund or exchange as per our policy.
                    Please note that shipping fees may apply and are non-refundable.
                </p>
            </div>
        </div>
    );
}

export default ReturnPolicy;
