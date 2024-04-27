import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDashBoardInfo } from "../store/actions/superAdminAction";
import CustomSpinner from "../Spinner";

const SalesByStore = () => {
    const { dashboardinfo } = useSelector((state) => state.superAdmin);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDashBoardInfo());
    }, [dispatch]);

    return (
        <div className="container mx-auto p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dashboardinfo?.salesByStore?.map((storeData, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="px-4 py-4 bg-gray-700 text-white">
                            <h3 className="text-lg font-semibold">{storeData._id}</h3>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl className="divide-y divide-gray-200">
                                <div className="px-4 py-4">
                                    <dt className="text-sm font-medium text-gray-500">Total Products</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{storeData.totalProducts}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SalesByStore;
