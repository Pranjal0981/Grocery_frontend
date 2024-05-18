import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    asyncfetchAllusers,
    asyncSuperAdminDeleteUser,
    asyncSuperAdminBlockUser,
    asyncSuperAdminUnblockUser,
    asyncSearchUsers // Assuming you have a search action
} from '../store/actions/superAdminAction';

const AllUser = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const { users } = useSelector((state) => state.superAdmin);
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchTerm.trim() === '') {
            dispatch(asyncfetchAllusers(currentPage));
        } else {
            dispatch(asyncSearchUsers(searchTerm, currentPage));
        }
    }, [dispatch, currentPage, searchTerm]);

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
            dispatch(asyncSuperAdminDeleteUser(userId));
        }
    };

    const handleBlockUser = (id) => {
        if (window.confirm('Are you sure you want to block this user?')) {
            dispatch(asyncSuperAdminBlockUser(id));
        }
    };

    const handleUnblockUser = async (id) => {
        if (window.confirm('Are you sure you want to unblock this user?')) {
            await dispatch(asyncSuperAdminUnblockUser(id));
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page for new search
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-8 text-center">All Users</h1>

            <div className="mb-4 text-center text-xl">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search users..."
                    className="px-4 py-2 border rounded w-full"
                />
            </div>

            <div className="mb-4 text-center text-xl">Total Users: {users?.length}</div>
            {users && users.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {users.map((user) => (
                        <div key={user._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img
                                src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                                alt=""
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <p className="text-lg font-semibold">{user.name}</p>
                                <p className="text-gray-700 mb-4">{user.email}</p>
                                <div className="flex justify-between items-center gap-[10px]">
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="bg-red-500 px-3 py-2 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    {user.blocked ? (
                                        <button
                                            onClick={() => handleUnblockUser(user._id)}
                                            className="bg-green-500 px-3 py-2 text-white rounded hover:bg-green-600"
                                        >
                                            Unblock
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleBlockUser(user._id)}
                                            className="bg-yellow-500 px-3 py-2 text-white rounded hover:bg-yellow-600"
                                        >
                                            Block
                                        </button>
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
            <div className="mt-8 flex justify-center space-x-4">
                <button
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllUser;
