import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCurrentUser, asyncDeleteAccount, asyncUpdateUser } from "../store/actions/userAction";

const AccountDetails = () => {
    const { user, isAuth } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Dispatch the action to fetch the current user details
        dispatch(asyncCurrentUser());
    }, [dispatch]);

    const handleEdit = () => {
        setEditing(true);
        setEditedUser(user);
    };

    const handleSave = async () => {
        setIsSaving(true);
        await dispatch(asyncUpdateUser(editedUser, user?._id));
        setEditing(false);
        setIsSaving(false);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            await dispatch(asyncDeleteAccount(user?._id));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    return (
        <div className="container mx-auto py-8 px-4">
            {isAuth ? (
                <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">Welcome, {user?.email}</h1>
                    <div className="border-b border-gray-300 mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600 font-semibold">First Name:</p>
                            {editing ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedUser?.firstName || ''}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                            ) : (
                                <p className="text-gray-800">{user?.firstName}</p>
                            )}
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">Last Name:</p>
                            {editing ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editedUser?.lastName || ''}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                            ) : (
                                <p className="text-gray-800">{user?.lastName}</p>
                            )}
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">Phone:</p>
                            {editing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedUser?.phone || ''}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                            ) : (
                                <p className="text-gray-800">{user?.phone}</p>
                            )}
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">Email:</p>
                            {editing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editedUser?.email || ''}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                />
                            ) : (
                                <p className="text-gray-800">{user?.email}</p>
                            )}
                        </div>
                    </div>
                    {editing ? (
                        <div className="mt-4 flex flex-col md:flex-row gap-4">
                            <button
                                onClick={handleSave}
                                className={`bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                onClick={() => setEditing(false)}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4 flex flex-col md:flex-row gap-4">
                            <button
                                onClick={handleEdit}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
                            >
                                Edit
                            </button>
                        
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4 text-indigo-600">Please log in to view your account details</h1>
                </div>
            )}
        </div>
    );
};



export default AccountDetails;
