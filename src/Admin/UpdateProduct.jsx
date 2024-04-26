import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncExploreById } from "../store/actions/productAction";
import { asyncUpdateProduct } from "../store/actions/adminAction";

const UpdateProduct = () => {
    const { id } = useParams();
    const { product } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const [updatedProduct, setUpdatedProduct] = useState();

    useEffect(() => {
        dispatch(asyncExploreById(id));
    }, [dispatch, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(asyncUpdateProduct(id,updatedProduct));
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="ProductName" className="block text-gray-700">
                            Product Name:
                        </label>
                        <input
                            type="text" disabled
                            id="ProductName"
                            name="ProductName"
                            value={product?.ProductName}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">
                            Description:
                        </label>
                        <textarea
                            id="description" disabled
                            name="description"
                            value={product?.description}
                            onChange={handleChange}
                            className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700">
                            Price:
                        </label>
                        <input
                            type="number" disabled
                            id="price"
                            name="price"
                            value={product?.price}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700">
                            Category:
                        </label>
                        <input
                            type="text" disabled
                            id="category"
                            name="category"
                            value={product?.category}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="brand" className="block text-gray-700">
                            Brand:
                        </label>
                        <input
                            type="text" disabled
                            id="brand"
                            name="brand"
                            value={product?.brand}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700">
                            Image URL:
                        </label>
                        <input
                            type="text" disabled
                            id="image"
                            name="image"
                            value={product?.image?.url}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gst" className="block text-gray-700">
                            GST:
                        </label>
                        <input
                            type="number" disabled
                            id="gst"
                            name="gst"
                            value={product?.gst}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cgst" className="block text-gray-700">
                            CGST:
                        </label>
                        <input
                            type="number" disabled
                            id="cgst"
                            name="cgst"
                            value={product?.cgst}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-gray-700">
                            Stock:
                        </label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="store" className="block text-gray-700">
                            Store:
                        </label>
                        <input
                            type="text" disabled
                            id="store"
                            name="store"
                            value={product?.store}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ProductCode" className="block text-gray-700">
                            Product Code:
                        </label>
                        <input
                            type="text" disabled
                            id="ProductCode"
                            name="ProductCode"
                            value={product?.ProductCode}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
