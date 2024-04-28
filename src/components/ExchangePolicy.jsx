import React from 'react';

const ExchangePolicy = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-6">Exchange Policy</h1>
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Eligibility Criteria for Exchange</h2>
                <p className="text-base text-gray-700 mb-4">
                    At RGS Grocery, we want to ensure that you are completely satisfied with your purchase. If you wish to exchange an item, please ensure it meets the following eligibility criteria:
                </p>
                <ul className="list-disc pl-6">
                    <li className="mb-2">
                        Items must be returned within 7 days of delivery.
                    </li>
                    <li className="mb-2">
                        Products must be unused, unopened, and in their original packaging.
                    </li>
                    <li className="mb-2">
                        Certain items, such as perishable goods, are not eligible for exchange.
                    </li>
                </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Initiating an Exchange</h2>
                <p className="text-base text-gray-700 mb-4">
                    To initiate an exchange, please follow these steps:
                </p>
                <ol className="list-decimal pl-6">
                    <li className="mb-2">
                        Contact our customer support team with your order details and the reason for the exchange.
                    </li>
                    <li className="mb-2">
                        Our team will review your request and provide you with instructions on how to proceed.
                    </li>
                    <li className="mb-2">
                        Once your exchange request is approved, you can ship the item back to us using a trackable shipping method.
                    </li>
                    <li className="mb-2">
                        Upon receiving the returned item, we will process your exchange and ship out the replacement product as per our policy.
                    </li>
                </ol>
            </div>
        </div>
    );
}

export default ExchangePolicy;
