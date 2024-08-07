import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncExploreById } from "../store/actions/productAction";
import queryString from 'query-string';
import { asyncUpdateProduct } from "../store/actions/adminAction";
const UpdateProduct = () => {
    
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const [selectedStore, setSelectedStore] = useState(null);
    const [storeOptions, setStoreOptions] = useState([]);
    const [additionalStock, setAdditionalStock] = useState([{ store: '', stock: '' }]);
    const [imageFile, setImageFile] = useState(null);
    const { product } = useSelector((state) => state.product);
    const stores = useSelector((state) => state.product.store);
    const [updatedProduct, setUpdatedProduct] = useState({});

    const navigate = useNavigate();
    const { page, search } = queryString.parse(location.search);

    useEffect(() => {
        fetch('/stores.json')
            .then((response) => response.json())
            .then((data) => setStoreOptions(data))
            .catch((error) => console.error('Error fetching stores:', error));
    }, []);

    useEffect(() => {
        if (product) {
            setUpdatedProduct(product);
        }
    }, [product]);

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

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', updatedProduct.productName);
        formData.append('description', updatedProduct.description);
        formData.append('sellingPrice', updatedProduct.sellingPrice);
        formData.append('purchasePrice', updatedProduct.purchasePrice);
        formData.append('MRP', updatedProduct.MRP);
        formData.append('size', updatedProduct.size);
        formData.append('category', updatedProduct.category);
        formData.append('brand', updatedProduct.brand);
        formData.append('gst', updatedProduct.gst);
        formData.append('cgst', updatedProduct.cgst);
        formData.append('stock', updatedProduct.stock);
        formData.append('store', selectedStore ? selectedStore.storeName : '');
        formData.append('productCode', updatedProduct.productCode);
        additionalStock.forEach((item, index) => {
            if (item.store && item.stock) {
                formData.append(`additionalStock[${index}][store]`, item.store);
                formData.append(`additionalStock[${index}][stock]`, item.stock);
            }
        });

        if (imageFile) {
            formData.append('image', imageFile);
        }

        await dispatch(asyncUpdateProduct(id, formData));

        // navigate(`/product-store/${product.store}?page=${page}&search=${search}`);
    };

    const handleStoreChange = (e) => {
        const storeName = e.target.value;
        const selectedStore = stores.find((store) => store.storeName === storeName);
        setSelectedStore(selectedStore);
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            stock: selectedStore ? selectedStore.stock : '',
        }));
    };

    useEffect(() => {
        if (product) {
            setUpdatedProduct(product);
            if (stores && stores.length > 0) {
                setSelectedStore(stores[0]);
                setUpdatedProduct((prevProduct) => ({
                    ...prevProduct,
                    stock: stores[0].stock,
                }));
            }
        }
    }, [product, stores]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddStock = () => {
        if (additionalStock.length < storeOptions.length - 1) {
            const newStock = { store: '', stock: '' };
            setAdditionalStock([...additionalStock, newStock]);
        }
    };

    const handleStockChange = (index, value) => {
        const updatedStock = [...additionalStock];
        updatedStock[index].stock = value;
        setAdditionalStock(updatedStock);
    };

    const handleStoreSelectChange = (index, value) => {
        const updatedStock = [...additionalStock];
        updatedStock[index].store = value;
        setAdditionalStock(updatedStock);
    };

    const selectedStores = new Set(stores?.map((store) => store.storeName));
    additionalStock.forEach((item) => {
        if (item.store) {
            selectedStores.add(item.store);
        }
    });

    return (
        <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-700 font-semibold">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={updatedProduct.productName || ''}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {/* Description */}
                    <div className="mb-4 md:col-span-2">
                        <label htmlFor="description" className="block text-gray-700 font-semibold">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={updatedProduct.description || ''}
                            onChange={handleChange}
                            className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {/* Selling Price */}
                    <div className="mb-4">
                        <label htmlFor="sellingPrice" className="block text-gray-700 font-semibold">
                            Selling Price
                        </label>
                        <input
                            type="number"
                            id="sellingPrice"
                            name="sellingPrice"
                            value={updatedProduct.sellingPrice || ''}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {/* Purchase Price */}
                    <div className="mb-4">
                        <label htmlFor="purchasePrice" className="block text-gray-700 font-semibold">
                            Purchase Price
                        </label>
                        <input
                            type="number"
                            id="purchasePrice"
                            name="purchasePrice"
                            value={updatedProduct.purchasePrice || ''}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {/* MRP */}
                    <div className="mb-4">
                        <label htmlFor="MRP" className="block text-gray-700 font-semibold">
                            MRP
                        </label>
                        <input
                            type="number"
                            id="MRP"
                            name="MRP"
                            value={updatedProduct.MRP || ''}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {/* Category */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 font-semibold">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={updatedProduct.category || ''}
                            onChange={handleChange}
                            className="form-input mt-1                                block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {/* Brand */}
                    <div className="mb-4">
                        <label htmlFor="brand" className="block text-gray-700 font-semibold">
                            Brand
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={updatedProduct.brand || ''}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {/* Image Upload */}
                    <div className="mb-4 md:col-span-2">
                        <label htmlFor="image" className="block text-gray-700 font-semibold">
                            Image Upload
                        </label>
                        {updatedProduct.image?.url && (
                            <img
                                src={updatedProduct.image.url}
                                alt="Product"
                                className="mb-2 rounded-md"
                                style={{ maxWidth: '200px' }}
                            />
                        )}
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {/* GST */}
                    <div className="mb-4">
                        <label htmlFor="gst" className="block text-gray-700 font-semibold">
                            GST
                        </label>
                        <input
                            type="number"
                            id="gst"
                            name="gst"
                            value={updatedProduct.gst || ''}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {/* CGST */}
                    <div className="mb-4">
                        <label htmlFor="cgst" className="block text-gray-700 font-semibold">
                            CGST
                        </label>
                        <input
                            type="number"
                            id="cgst"
                            name="cgst"
                            value={updatedProduct.cgst || ''}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {/* Quantity */}
                    <div className="mb-4">
                        <label htmlFor="size" className="block text-gray-700 font-semibold">
                            Quantity
                        </label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            value={updatedProduct.size || ''}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    {/* Store */}
                    <div className="mb-4">
                        <label htmlFor="store" className="block text-gray-700 font-semibold">
                            Store
                        </label>
                        <select
                            id="store"
                            name="store"
                            value={selectedStore ? selectedStore.storeName : ''}
                            onChange={handleStoreChange}
                            className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {stores?.map((store, index) => (
                                <option key={index} value={store.storeName}>
                                    {store.storeName} (Stock: {store.stock})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-gray-700 font-semibold">
                            Stock
                        </label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={updatedProduct.stock}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>

                    {/* Additional Stock Entries */}
                    {additionalStock.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor={`store-${index}`} className="block text-sm font-medium text-gray-700">
                                    Additional Store
                                </label>
                                <select
                                    id={`store-${index}`}
                                    value={item.store}
                                    onChange={(e) => handleStoreSelectChange(index, e.target.value)}
                                    className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    <option value="">Select a store</option>
                                    {storeOptions.map((storeOption, i) => {
                                        if (!selectedStores.has(storeOption) || item.store === storeOption) {
                                            return (
                                                <option key={i} value={storeOption}>
                                                    {storeOption}
                                                </option>
                                            );
                                        }
                                        return null;
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor={`stock-${index}`} className="block text-sm font-medium text-gray-700">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id={`stock-${index}`}
                                    value={item.stock}
                                    onChange={(e) => handleStockChange(index, e.target.value)}
                                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddStock}
                        className="btn btn-primary mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Store Stock
                    </button>
                    {/* Product Code */}
                    <div className="mb-4">
                        <label htmlFor="productCode" className="block text-gray-700 font-semibold">
                            Product Code
                        </label>
                        <input
                            type="text"
                            id="productCode"
                            name="productCode"
                            value={updatedProduct.productCode || ''}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                </div>
                {/* Submit Button */}
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;

