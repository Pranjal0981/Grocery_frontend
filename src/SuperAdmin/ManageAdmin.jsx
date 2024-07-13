import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAdmins, asyncUpdatePermission } from '../store/actions/superAdminAction';

const ManageAdmin = () => {
    const dispatch = useDispatch();
    const { admins } = useSelector((state) => state.superAdmin);

    useEffect(() => {
        dispatch(asyncGetAdmins());
    }, [dispatch]);

    const handleCheckboxChange = (adminId, permission) => {
        const updatedAdmins = admins.map(admin => {
            if (admin._id === adminId) {
                return {
                    ...admin,
                    permissions: {
                        ...admin.permissions,
                        [permission]: !admin.permissions[permission]
                    }
                };
            }
            return admin;
        });

        const updatedAdmin = updatedAdmins.find(admin => admin._id === adminId);
        dispatch(asyncUpdatePermission(adminId, updatedAdmin.permissions));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Can Delete Products
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Can Update Products
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Can Manage Stores
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Can View Orders
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Can Update Orders
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Can Add Products
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map(admin => (
                            <tr key={admin._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {admin.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={admin.permissions.canDeleteProducts}
                                        onChange={() => handleCheckboxChange(admin._id, 'canDeleteProducts')}
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={admin.permissions.canUpdateProducts}
                                        onChange={() => handleCheckboxChange(admin._id, 'canUpdateProducts')}
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={admin.permissions.canManageStores}
                                        onChange={() => handleCheckboxChange(admin._id, 'canManageStores')}
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={admin.permissions.canViewOrders}
                                        onChange={() => handleCheckboxChange(admin._id, 'canViewOrders')}
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={admin.permissions.canUpdateOrders}
                                        onChange={() => handleCheckboxChange(admin._id, 'canUpdateOrders')}
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={admin.permissions.canAddProducts}
                                        onChange={() => handleCheckboxChange(admin._id, 'canAddProducts')}
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAdmin;
