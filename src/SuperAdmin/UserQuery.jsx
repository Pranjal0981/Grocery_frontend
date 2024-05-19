import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncContactQuery } from '../store/actions/superAdminAction';

const UserQuery = () => {
    const { queries, loading, error } = useSelector((state) => state.superAdmin); // Adjusted state property to match the reducer setup
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncContactQuery());
    }, [dispatch]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">User Queries</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {queries?.map((query) => (
                        <div key={query._id} className="bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{query?.name}</h3>
                            <p className="text-gray-700"><strong>Email:</strong> {query?.email}</p>
                            <p className="text-gray-700"><strong>Store:</strong> {query?.store}</p>
                            <p className="text-gray-700 mt-2">{query?.message}</p>
                            <p className="text-gray-500 text-sm mt-2">Submitted on: {new Date(query?.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserQuery;
