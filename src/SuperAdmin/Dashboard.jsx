import React, { useEffect } from 'react';
import { fetchDashBoardInfo } from '../store/actions/superAdminAction';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomSpinner from '../Spinner';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { dashboardinfo, loading } = useSelector((state) => state.superAdmin);

    useEffect(() => {
        dispatch(fetchDashBoardInfo());
    }, [dispatch]);

    const handleSalesClick = () => {
        navigate('/superAdmin/salesByStore');
    };

    return (
        <>
            {loading ? (
                <div className="container mx-auto px-4 py-8 flex justify-center items-center">
                    <CustomSpinner/>
                                    </div>
            ) : (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-semibold mb-8 text-center">Admin Dashboard</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Total Members Card */}
                        <div className="bg-blue-100 shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">Total Members</h2>
                                <p className="text-3xl font-bold">{dashboardinfo?.totalMembers}</p>
                            </div>
                        </div>

                        {/* Active Members Card */}
                        <div className="bg-green-100 shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">Active Members</h2>
                                <p className="text-3xl font-bold">{dashboardinfo?.activeUsersByDay}</p>
                            </div>
                        </div>

                        {/* Inactive Members Card */}
                        <div className="bg-yellow-100 shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">Inactive Members</h2>
                                <p className="text-3xl font-bold">{dashboardinfo?.inactiveUsersIn7Days}</p>
                            </div>
                        </div>

                        {/* Total Blocked Members Card */}
                        <div className="bg-red-100 shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">Total Blocked Members</h2>
                                <p className="text-3xl font-bold">{dashboardinfo?.totalBlockedMembers}</p>
                            </div>
                        </div>

                        {/* Total Profit Card */}
                        <div className="bg-purple-100 shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">Total Profit</h2>
                                <p className="text-3xl font-bold">{dashboardinfo?.totalProfit}</p>
                            </div>
                        </div>

                        {/* Pending Orders Card */}
                        <div className="bg-pink-100 shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">Pending Orders</h2>
                                <p className="text-3xl font-bold">{dashboardinfo?.pendingOrdersCount}</p>
                            </div>
                        </div>

                        {/* Total Sales Card */}
                        <div className="bg-pink-100 shadow-lg rounded-lg overflow-hidden cursor-pointer" onClick={handleSalesClick}>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
                                <p className="text-3xl font-bold">{dashboardinfo?.totalSales}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminDashboard;
