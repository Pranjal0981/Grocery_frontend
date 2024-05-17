import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUploadProducts } from '../store/actions/adminAction';

const AddProductForm = () => {
    const dispatch=useDispatch()
    const {user,isAuth}=useSelector((state)=>state.user)
    console.log(user)
    const [purchasePrice, setPurchasePrice] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState(null); // Use null instead of ''
    const [gst, setGst] = useState('');
    const [cgst, setCgst] = useState('');
    const [productCode, setProductCode] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [newBrand, setNewBrand] = useState('');

    const [newCategory, setNewCategory] = useState('');
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [isBrandSelected, setIsBrandSelected] = useState(false);
    const [storeOptions, setStoreOptions] = useState([]);
    const [additionalStock, setAdditionalStock] = useState([{ store: '', stock: '' }]);
    useEffect(() => {
        // Fetch the list of stores from the JSON file
        fetch('/stores.json')
            .then((response) => response.json())
            .then((data) => setStoreOptions(data))
            .catch((error) => console.error('Error fetching stores:', error));
    }, []);
    const [mrp, setMrp] = useState('');
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
        { label: "Hair Oil", link: "/hair-oil" },
        { label: "Hair Colour", link: "/hair-colour" },
        { label: "ToothPaste", link: "/toothpaste" },
        { label: "Nutrition", link: "/nutrition" },
        { label: "Dish Wash", link: "/dish-wash" },
        { label: "Coffee & Tea", link: "/coffee&tea" },
        { label: "Body Soap", link: "/bodysoap" },
        { label: "Bathing Soap", link: "/bathingsoap" },
        { label: "Uncategorized", link: "/uncategorized" },

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
        "Dettol",
        "Haldiram",
        "Parle",
        "Fogg",
        "Nestle",
        "Nescafe",
        "Eclairs",
    
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // Append all form data to the FormData object
        formData.append('purchasePrice', purchasePrice);
        formData.append('sellingPrice', sellingPrice);
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('MRP', mrp);
        const selectedCategory = category !== '' ? category : newCategory;
        formData.append('category', selectedCategory);
        const selectedBrand = brand !== '' ? brand : newBrand;
        formData.append('brand', selectedBrand);
        formData.append('image', image); // Image is already a File object
        formData.append('gst', gst);
        formData.append('quantity', quantity);

        formData.append('cgst', cgst);
        formData.append('size', size);
        // Append additional stock data
        additionalStock.forEach((item, index) => {
            formData.append(`stores[${index}][store]`, item.store);
            formData.append(`stores[${index}][stock]`, item.stock);
        });
        formData.append('productCode', productCode);
        console.log(formData)
        // Dispatch formData to your Redux store
        dispatch(asyncUploadProducts(formData));
    };

    const handleBrandInputChange = (e) => {
        setNewBrand(e.target.value);
    };
    const handleAddStock = () => {
        // Create a new object for the additional stock of a store
        const newStock = { store: '', stock: '' };
        // Add the new stock to the additionalStock array
        setAdditionalStock([...additionalStock, newStock]);
    };

    const handleStockChange = (index, value) => {
        // Create a copy of additionalStock array
        const updatedStock = [...additionalStock];
        // Update the stock value at the specified index
        updatedStock[index].stock = value;
        // Update the state with the modified array
        setAdditionalStock(updatedStock);
    };


    const handleAddBrand = () => {
        // Check if the brand is already in the list
        if (!brands.includes(newBrand) && newBrand.trim() !== '') {
            setBrand(newBrand);
            setNewBrand('');
        }
    };
    const handleDeleteStock = (index) => {
        // Create a copy of additionalStock array
        const updatedStock = [...additionalStock];
        // Remove the stock entry at the specified index
        updatedStock.splice(index, 1);
        // Update the state with the modified array
        setAdditionalStock(updatedStock);
    };



    return (
        <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="mrp" className="block text-sm font-medium text-gray-700">MRP</label>
                        <input type="number" id="mrp" value={mrp} onChange={(e) => setMrp(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md" />
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md resize-none" rows="3"></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Purchase Price</label>
                        <input type="number" id="purchasePrice" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Selling Price</label>
                        <input type="number" id="sellingPrice" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700">Quantity:</label>
                        <input type="text" id="size" value={size} onChange={(e) => setSize(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md" />
                    </div>
                  
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setIsCategorySelected(true);
                                setNewCategory('');
                            }}
                            className="form-select mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat.label}>{cat.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                        <select
                            id="brand"
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value);
                                setIsBrandSelected(true);
                                setNewBrand('');
                            }}
                            className="form-select mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md"
                        >
                            <option value="">Select Brand</option>
                            {brands.map((brandName, index) => (
                                <option key={index} value={brandName}>{brandName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {!isCategorySelected && (
                    <div>
                        <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700">New Category</label>
                        <input
                            type="text"
                            id="newCategory"
                            value={newCategory}
                            onChange={(e) => {
                                setNewCategory(e.target.value);
                                setIsCategorySelected(false);
                                setCategory('');
                            }}
                            className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md"
                        />
                    </div>
                )}
                {!isBrandSelected && (
                    <div>
                        <label htmlFor="newBrand" className="block text-sm font-medium text-gray-700">New Brand</label>
                        <input
                            type="text"
                            id="newBrand"
                            value={newBrand}
                            onChange={(e) => {
                                setNewBrand(e.target.value);
                                setIsBrandSelected(false);
                                setBrand('');
                            }}
                            className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md"
                        />
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input type="file" id="image" name='image' onChange={(e) => setImage(e.target.files[0])} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="gst" className="block text-sm font-medium text-gray-700">GST Percentage</label>
                        <input type="number" id="gst" value={gst} onChange={(e) => setGst(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="cgst" className="block text-sm font-medium text-gray-700">CGST Percentage</label>
                        <input type="number" id="cgst" value={cgst} onChange={(e) => setCgst(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="productCode" className="block text-sm font-medium text-gray-700">Product Code</label>
                        <input type="text" id="productCode" value={productCode} onChange={(e) => setProductCode(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md" />
                    </div>
                </div>
                {additionalStock.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor={`store-${index}`} className="block text-sm font-medium text-gray-700">Store {index + 1}</label>
                            <select
                                id={`store-${index}`}
                                value={item.store}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const updatedStock = [...additionalStock];
                                    updatedStock[index].store = value;
                                    setAdditionalStock(updatedStock);
                                }}
                                className="form-select mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md"
                            >
                                <option value="">Select Store</option>
                                {storeOptions?.map((option, idx) => (
                                    <option key={idx} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor={`stock-${index}`} className="block text-sm font-medium text-gray-700">Stock</label>
                            <input
                                type="text"
                                id={`stock-${index}`}
                                value={item.stock}
                                onChange={(e) => handleStockChange(index, e.target.value)}
                                className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                ))}
                <div className="flex justify-between items-center">
                    <button type="button" onClick={handleAddStock} className="btn bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">Add Stock</button>
                    <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">Submit</button>
                </div>
            </form>
        </div>
    );

};

export default AddProductForm;
