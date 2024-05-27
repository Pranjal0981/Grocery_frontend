import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccessComponent = () => {
    const location = useLocation();
    const paymentId = location.state?.reference_id;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4 text-indigo-800">Payment Status</h1>
                    {paymentId ? (
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
                            <p className="text-lg font-bold">Payment ID:</p>
                            <p className="text-xl">{paymentId}</p>
                        </div>
                    ) : (
                        <p className="text-lg mb-4">No payment ID available.</p>
                    )}
                    {/* You can add more information about the payment here */}
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessComponent;
