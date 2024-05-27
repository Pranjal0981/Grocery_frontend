import React from 'react';
import FAQs from './FAQs';

const SupportCenter = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-6">Support Center</h1>
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <p className="text-base text-gray-700 mb-4">
                    If you have any questions, concerns, or feedback, please feel free to reach out to us using the contact information provided below:
                </p>
                <ul className="list-disc pl-6">
                    <li className="mb-2">
                        <strong>Phone:</strong> 9244321195
                    </li>
                    <li className="mb-2">
                        <strong>Email:</strong> inforgsgrocery@gmail.com
                    </li>
                    <li className="mb-2">
                        <strong>Address:</strong> HEAD OFFICE NO.-1, MPESEDC IT COMPLEX BUILDING, IT Park, BADWAI Bhopal, Pincode - 462033

                    </li>
                </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
                <p className="text-base text-gray-700 mb-4">
                    Before reaching out to our support team, you may find answers to your questions in our FAQ section:
                </p>
                <p className="text-base text-gray-700 mb-4">
<FAQs/>
                </p>
                <p className="text-base text-gray-700">
                    If you cannot find the information you need in our FAQs, please don't hesitate to contact us directly.
                </p>
            </div>
        </div>
    );
}

export default SupportCenter;
