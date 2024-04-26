import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUploadProducts } from '../store/actions/adminAction';

const AddProductForm = () => {
    const dispatch=useDispatch()

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [gst, setGst] = useState('');
    const [cgst, setCgst] = useState('');
    const [stock, setStock] = useState('');
    const [store, setStore] = useState('');
    const categories = [
        { label: "Oral Care & Wellness", link: "/oral-care-wellness" },
        { label: "Atta, Rice & Dal", link: "/atta-rice-dal" },
        { label: "Household & Cleaning", link: "/household-cleaning" },
        { label: "Spices, Salt & Sugar", link: "/spices-salt-sugar" },
        { label: "Pooja Samagri", link: "/pooja-samagri" },
        { label: "Oil & Ghee", link: "/oil-ghee" },
        { label: "Dry Fruits, Nuts & Seeds", link: "/dry-fruits-nuts-seeds" },
        { label: "Snacks & Packaged Food", link: "/snacks-packaged-food" },
        { label: "Beverages", link: "/beverages" },
        { label: "Chocolates & Sweets", link: "/chocolates-sweets" },
        { label: "Laundry & Dishwash", link: "/laundry-dishwash" },
        { label: "Body & Skin Care", link: "/body-skin-care" },
        { label: "Hair Care", link: "/hair-care" },
    ];
    const brands = [
        "Hindustan Unilever",
        "Emami",
        "Godrej",
        "Amul",
        "Bajaj",
        "Beardo",
        "Britannia",
        "Dabur",
        "Denver",
        "Beiersdorf",
        "Belvita",
        "Dettol"
    ];
    const stores = ["AwadhPuri", "Minal Residency", "Jhansi", "Rohit Nagar"];
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('brand', brand);
        formData.append('image', image);
        formData.append('gst', gst);
        formData.append('cgst', cgst);
        formData.append('stock', stock);
        formData.append('store', store);
        dispatch(asyncUploadProducts(formData));
        
    };



    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="form-select mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.label}>{cat.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                    <select id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} className="form-select mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
                        <option value="">Select Brand</option>
                        {brands.map((brandName, index) => (
                            <option key={index} value={brandName}>{brandName}</option>
                        ))}
                    </select>
                </div>
               
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image </label>
                    <input type="file" id="image" name='image' onChange={(e) => setImage(e.target.files[0])} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="gst" className="block text-sm font-medium text-gray-700">GST Percentage</label>
                    <input type="number" id="gst" value={gst} onChange={(e) => setGst(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="cgst" className="block text-sm font-medium text-gray-700">CGST Percentage</label>
                    <input type="number" id="cgst" value={cgst} onChange={(e) => setCgst(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                    <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="store" className="block text-sm font-medium text-gray-700">Store</label>
                    <select id="store" value={store} onChange={(e) => setStore(e.target.value)} className="form-select mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
                        <option value="">Select Store</option>
                        {stores.map((storeName, index) => (
                            <option key={index} value={storeName}>{storeName}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition-colors duration-300">Submit</button>
            </form>
        </div>
    );
};

export default AddProductForm;
