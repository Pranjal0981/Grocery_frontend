import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCurrentUser, asyncDeleteAccount, asyncUpdateUser } from "../store/actions/userAction";

const AccountDetails = () => {
    const { user, isAuth } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});

    useEffect(() => {
        // Dispatch the action to fetch the current user details
        dispatch(asyncCurrentUser());
    }, [dispatch]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        // Dispatch action to save edited user details
        await dispatch(asyncUpdateUser(editedUser, user?._id)); // Pass editedUser directly, not inside an object
        setEditing(false);
    };

    const handleDelete = async () => {
        await dispatch(asyncDeleteAccount(user?._id))
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    return (
        <div className="container mx-auto py-8">
            {isAuth ? (
                <div className="max-w-lg mx-auto bg-white shadow-md p-8 rounded-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">Welcome, {user.email}</h1>
                    <div className="border-b border-gray-300 mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600 font-semibold">First Name:</p>
                            {editing ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedUser.firstName}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                            ) : (
                                <p className="text-gray-800">{user.firstName}</p>
                            )}
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">Last Name:</p>
                            {editing ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editedUser.lastName}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                            ) : (
                                <p className="text-gray-800">{user.lastName}</p>
                            )}
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">Phone:</p>
                            {editing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedUser.phone}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                            ) : (
                                <p className="text-gray-800">{user.phone}</p>
                            )}
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">Email:</p>
                            {editing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                            ) : (
                                <p className="text-gray-800">{user.email}</p>
                            )}
                        </div>
                    </div>
                    {editing ? (
                        <div className="mt-4">
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 w-full md:w-auto"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditing(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-md w-full md:w-auto mt-2 md:mt-0"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <button
                                onClick={handleEdit}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 w-full md:w-auto"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-md w-full md:w-auto mt-2 md:mt-0"
                            >
                                Delete Account
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Please log in to view your account details</h1>
                </div>
            )}
        </div>
    );
};

export default AccountDetails;
