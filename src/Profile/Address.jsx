import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddAddress, asyncDeleteAddress, asyncSelectAddressIndex } from '../store/actions/userAction'



export const AddressForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await dispatch(asyncAddAddress({ formData }));
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Address</h2>
            <label className="block mb-4">
                <span className="text-gray-700">Full Name</span>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Address Line 1</span>
                <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Address Line 2</span>
                <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">City</span>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">State</span>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Postal Code</span>
                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </label>
            <label className="block mb-6">
                <span className="text-gray-700">Phone</span>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                />
            </label>
            <button
                type="submit"
                className={`w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
};


export const Address = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [selectedAddress, setSelectedAddress] = useState(user?.selectedAddressIndex); // Set default to index 0

    // Function to handle delete address
    const handleDeleteAddress = (addressIndex) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            dispatch(asyncDeleteAddress(addressIndex, user?._id));
        }
    };

    // Function to handle selecting an address
    const handleSelectAddress = (addressIndex) => {
        setSelectedAddress(addressIndex);
        dispatch(asyncSelectAddressIndex(user._id, { addressIndex }));
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">User Addresses</h1>
            {user && user.address && user.address.length > 0 ? (
                user.address.map((address, index) => (
                    <div key={index} className={`bg-white shadow-md rounded-lg p-6 mb-4 transition-transform transform ${selectedAddress === index ? 'scale-105 border-2 border-indigo-600' : ''}`}>
                        <label className="flex items-center mb-2 cursor-pointer">
                            <input
                                type="radio"
                                name="selectedAddress"
                                value={index}
                                checked={selectedAddress === index}
                                onChange={() => handleSelectAddress(index)}
                                className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <div>
                                <p className="text-lg font-semibold mb-1 text-gray-900">Full Name: {address.fullName}</p>
                                <p className="text-gray-700 mb-1">Address Line 1: {address.addressLine1}</p>
                                {address.addressLine2 && <p className="text-gray-700 mb-1">Address Line 2: {address.addressLine2}</p>}
                                <p className="text-gray-700 mb-1">City: {address.city}</p>
                                <p className="text-gray-700 mb-1">State: {address.state}</p>
                                <p className="text-gray-700 mb-1">Phone: {address.phone}</p>
                                <p className="text-gray-700 mb-1">Postal Code: {address.postalCode}</p>
                            </div>
                        </label>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => handleDeleteAddress(index)} className="text-red-600 hover:text-red-800 font-semibold transition duration-300">Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-600 text-center">No addresses found.</p>
            )}
        </div>
    );
};


