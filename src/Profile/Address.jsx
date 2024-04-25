import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddAddress, asyncDeleteAddress } from '../store/actions/userAction'

export const AddressForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });
    const dispatch=useDispatch()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
      await dispatch(asyncAddAddress({formData}))
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <label className="block mb-2">
                <span className="text-gray-700">Full Name:</span>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                    required
                />
            </label>
            <label className="block mb-2">
                <span className="text-gray-700">Address Line 1:</span>
                <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                    required
                />
            </label>
            <label className="block mb-2">
                <span className="text-gray-700">Address Line 2:</span>
                <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                />
            </label>
            <label className="block mb-2">
                <span className="text-gray-700">City:</span>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                    required
                />
            </label>
            <label className="block mb-2">
                <span className="text-gray-700">State:</span>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                    required
                />
            </label>
            <label className="block mb-2">
                <span className="text-gray-700">Postal Code:</span>
                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                />
            </label>
            <label className="block mb-2">
                <span className="text-gray-700">Country:</span>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full"
                    required
                />
            </label>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Submit
            </button>
        </form>
    );
};

export const Address = () => {
    const { user, isAuth } = useSelector((state) => state.user);
const dispatch = useDispatch()
    // Function to handle delete address
    const handleDeleteAddress = (addressIndex) => {
        dispatch(asyncDeleteAddress(addressIndex,user?._id))
    };



    return (
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">User Addresses</h1>
            {user && user.address && user.address.length > 0 ? (
                user.address.map((address, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md p-6 mb-4">
                        <p className="text-lg font-semibold mb-2">Full Name: {address.fullName}</p>
                        <p className="text-gray-600 mb-1">Address Line 1: {address.addressLine1}</p>
                        <p className="text-gray-600 mb-1">Address Line 2: {address.addressLine2}</p>
                        <p className="text-gray-600 mb-1">City: {address.city}</p>
                        <p className="text-gray-600 mb-1">State: {address.state}</p>
                        <p className="text-gray-600 mb-1">Country: {address.country}</p>
                        <p className="text-gray-600 mb-1">Postal Code: {address.postalCode}</p>
                        {/* Add more fields as needed */}
                        <div className="flex justify-end mt-4">
                            <button onClick={() => handleDeleteAddress(index)} className="text-red-500">Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No addresses found.</p>
            )}
        </div>
    
    );
};

