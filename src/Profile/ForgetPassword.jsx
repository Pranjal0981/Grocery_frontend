import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  asyncSendForgetLink } from '../store/actions/userAction';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log('Form submitted with email:', email);
        await  dispatch(asyncSendForgetLink({email}))
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 focus:outline-none"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
