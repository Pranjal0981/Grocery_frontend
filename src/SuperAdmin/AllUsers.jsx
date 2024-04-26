import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncfetchAllusers, asyncAdminDeleteUser, asyncAdminBlockUser, asyncAdminUnblockUser } from '../store/actions/adminAction';


const AllUser = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { users } = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncfetchAllusers(currentPage));
    }, [dispatch, currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(asyncAdminDeleteUser(userId));
        }
    };

    const handleBlockUser = (id) => {
        if (window.confirm('Are you sure you want to block this user?')) {
            dispatch(asyncAdminBlockUser(id ));
        }
    }

    const handleUnblockUser =async (id) => {
        if (window.confirm('Are you sure you want to unblock this user?')) {
            await dispatch(asyncAdminUnblockUser(id));
        }
    }

    return (
        <>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-8 text-center">All Users</h1>
                <div className="mb-4 text-center">Total Users: {users?.length}</div> {/* Display total users count */}
                {users && users.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {users.map((user) => (
                            <div key={user._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <img src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg" alt="" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <p className="text-lg font-semibold">{user.name}</p>
                                    <p className="text-gray-700 mb-2">{user.email}</p>
                                    <div className="flex justify-between">
                                        <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                                        {user.blocked ? (
                                            <button onClick={() => handleUnblockUser(user?._id)} className="bg-green-500 text-white px-4 py-2 rounded">Unblock</button>
                                        ) : (
                                            <button onClick={() => handleBlockUser(user?._id)} className="bg-red-500 text-white px-4 py-2 rounded">Block</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600">
                        <p>No users found</p>
                    </div>
                )}
                <div className="mt-8 flex justify-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handlePrevPage}>Previous</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </>
    );
};

export default AllUser;
