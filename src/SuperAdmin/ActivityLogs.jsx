import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchActiveUser, asyncFetchInactiveUsers } from '../store/actions/superAdminAction';

export const ActiveUser = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { users } = useSelector((state) => state.superAdmin); // Assuming activeUsers is stored in state.admin
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncFetchActiveUser(currentPage)); // Dispatch action to fetch active users
    }, [dispatch, currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <>
  
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-8 text-center">Active Users</h1>
                {users && users.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Active
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="h-4 w-4 rounded-full bg-green-400"></div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{user?.phone}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-gray-600">
                        <p>No active users found</p>
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


export const InactiveUser = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { users } = useSelector((state) => state.superAdmin); // Assuming activeUsers is stored in state.admin
    const dispatch = useDispatch();
    console.log(users)
    useEffect(() => {
        dispatch(asyncFetchInactiveUsers(currentPage)); // Dispatch action to fetch active users
    }, [dispatch, currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <>
   
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-8 text-center">Inactive Users in Last 7 days</h1>
                {users && users?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Inactive
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users?.map((user) => (
                                    <tr key={user?._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="h-4 w-4 rounded-full bg-red-400"></div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{user?.phone}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-gray-600">
                        <p>No Inactive users found</p>
                    </div>
                )}
                <div className="mt-8 flex justify-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handlePrevPage}>Previous</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </>
    );
}