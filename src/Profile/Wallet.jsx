import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Statistic, Button, InputNumber, Form, Spin } from 'antd';
import axios from '../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { asyncAddMoneyToWallet } from '../store/actions/userAction'
const Wallet = () => {
    const dispatch=useDispatch()
    const { user } = useSelector((state) => state.user);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddFunds = async (value) => {
        const { amount } = value;
        const token = localStorage.getItem('token');
        setIsLoading(true);

        try {
            // Get Razorpay key from the backend
            const { data: keyData } = await axios.get("/api/getkey", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const key = keyData.key;

            // Create Razorpay order from the backend
            const { data: orderData } = await axios.post("/user/api/checkout", { amount }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { order } = orderData;

            // Razorpay payment options
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "RGS GROCERY",
                description: "Add Funds to Wallet",
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
                            razorpay_signature: response.razorpay_signature
                        };

                        const verificationResponse = await axios.post("/user/api/paymentverification", paymentVerificationData, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });


                        const { reference_id } = verificationResponse.data;
                        await dispatch(asyncAddMoneyToWallet({amount},user?._id))
                        toast.success('Payment successful! Reference ID: ' + reference_id);

                        Swal.fire({
                            icon: 'success',
                            title: 'Funds Added!',
                            text: 'Your funds have been successfully added to your wallet.',
                        });

                        navigate('/payment/success', { state: { reference_id: reference_id } });
                        form.resetFields();

                    } catch (error) {
                        console.error("Error processing payment:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'There was an error processing your payment. Please try again later.',
                        });
                    } finally {
                        setIsLoading(false);
                    }
                },
                modal: {
                    ondismiss: () => {
                        setIsLoading(false); // Reset the loading state when the payment window is closed
                    }
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            console.error("Error in checkout:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error with the checkout process. Please try again later.',
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card
                className="max-w-md w-full bg-white rounded-lg shadow-md"
                title="Wallet"
                bordered={false}
                headStyle={{ fontSize: '1.5rem', textAlign: 'center' }}
            >
                <div className="mb-4">
                    <Statistic
                        title="Current Balance"
                        value={user?.wallet}
                        precision={2}
                        valueStyle={{ color: '#3f8600', textAlign: 'center' }}
                        prefix="₹"
                    />
                </div>
                <Form
                    form={form}
                    name="add_funds"
                    layout="vertical"
                    onFinish={handleAddFunds}
                    className="mt-4"
                >
                    <Form.Item
                        name="amount"
                        label="Add Amount"
                        rules={[{ required: true, message: 'Please enter an amount' }]}
                    >
                        <InputNumber
                            min={1}
                            max={10000}
                            prefix="₹"
                            style={{ width: '100%' }}
                            placeholder="Enter amount to add"
                        />
                    </Form.Item>
                    <Form.Item className="text-center">
                        <Button type="primary" htmlType="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Spin /> : 'Add Funds'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Wallet;
