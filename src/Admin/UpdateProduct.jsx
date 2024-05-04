import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncExploreById } from "../store/actions/productAction";
import { asyncUpdateProduct } from "../store/actions/adminAction";

const UpdateProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
const [imageFile,setImageFile]=useState(null)
    // Accessing product from Redux state
    const { product } = useSelector((state) => state.product);
    const [updatedProduct, setUpdatedProduct] = useState({});

    // Set initial values of updatedProduct when product data is available
    useEffect(() => {
        if (product) {
            setUpdatedProduct(product);
        }
    }, [product]);

    useEffect(() => {
        // Fetch product data when component mounts
        dispatch(asyncExploreById(id));
    }, [dispatch, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("ProductName", updatedProduct.ProductName);
        formData.append("description", updatedProduct.description);
        formData.append("sellingPrice", updatedProduct.sellingPrice);
        formData.append("PurchasePrice", updatedProduct.purchasePrice);

        formData.append("MRP", updatedProduct.MRP);
        formData.append("Size", updatedProduct.Size);
        formData.append("category", updatedProduct.category);
        formData.append("brand", updatedProduct.brand);
        formData.append("gst", updatedProduct.gst);
        formData.append("cgst", updatedProduct.cgst);
        formData.append("stock", updatedProduct.stock);
        formData.append("store", product.store);
        formData.append("ProductCode", updatedProduct.ProductCode);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        // Dispatch action to update product
        dispatch(asyncUpdateProduct(id, formData));
    };

    // Show loading or empty state while product data is being fetched
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    {/* Render input fields with updatedProduct values */}
                    {/* Update the value prop of each input field */}
                    {/* Make sure the name attribute matches the key of updatedProduct */}
                    <div className="mb-4">
                        <label htmlFor="ProductName" className="block text-gray-700">
                            Product Name:
                        </label>
                        <input
                            type="text"
                            id="ProductName"
                            name="ProductName"
                            value={updatedProduct.ProductName || ""}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                   
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={updatedProduct.description || ""}
                            onChange={handleChange}
                            className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700">
                            Selling Price:
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="sellingPrice"
                            value={updatedProduct.sellingPrice || ""}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700">
                            Purchase Price:
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="purchasePrice"
                            value={updatedProduct.purchasePrice || ""}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700">
                            MRP
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="MRP"
                            value={updatedProduct.MRP || ""}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700">
                            Category:
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={updatedProduct.category || ""}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="brand" className="block text-gray-700">
                            Brand:
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={updatedProduct.brand || ""}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700">
                            Image Upload:
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gst" className="block text-gray-700">
                            GST:
                        </label>
                        <input
                            type="number"
                            id="gst"
                            name="gst"
                            value={updatedProduct.gst || ""}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cgst" className="block text-gray-700">
                            CGST:
                        </label>
                        <input
                            type="number"
                            id="cgst"
                            name="cgst"
                            value={updatedProduct.cgst || ""}
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
                            value={updatedProduct.stock || ""}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="Size" className="block text-gray-700">
                            Quantity:
                        </label>
                        <input
                            type="text"
                            id="size"
                            name="Size"
                            value={updatedProduct.Size || ""}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="store" className="block text-gray-700">
                            Store:
                        </label>
                        <input
                            type="text"
                            id="store"
                            name="store"
                            value={product.store || ""}
                            onChange={handleChange} disabled
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ProductCode" className="block text-gray-700">
                            Product Code:
                        </label>
                        <input
                            type="text"
                            id="ProductCode"
                            name="ProductCode"
                            value={updatedProduct.ProductCode || ""}
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
