import React from 'react';

const FAQs = () => {
    const faqs = [
        {
            question: "How do I return an item?",
            answer: "To return an item, please contact our customer support team with your order details and the reason for the return. Our team will guide you through the return process."
        },
        {
            question: "What is the timeframe for returns?",
            answer: "Items must be returned within 24 hrs of delivery."
        },
        {
            question: "Can I return perishable items?",
            answer: "Perishable items such as fruits, vegetables, and dairy products are not eligible for return."
        },
        {
            question: "How long does it take to process a refund?",
            answer: "Once your return is approved, we will process your refund within 3-5 business days."
        },
        {
            question: "Do I need to pay for return shipping?",
            answer: "Return shipping fees may apply and are the responsibility of the customer."
        },
        {
            question: "Can I exchange an item?",
            answer: "Yes, we accept exchanges for items of equal or lesser value. Please contact our customer support team for assistance."
        },
        // Add more FAQs as needed
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <dt className="text-lg font-semibold">{faq.question}</dt>
                        <dd className="mt-2 text-base text-gray-700">{faq.answer}</dd>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FAQs;
