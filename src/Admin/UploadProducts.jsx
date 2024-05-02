import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUploadProducts } from '../store/actions/adminAction';

const AddProductForm = () => {
    const dispatch=useDispatch()
    const {user,isAuth}=useSelector((state)=>state.user)
    console.log(user)
    const [purchasePrice, setPurchasePrice] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [size,setSize]=useState('')
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [gst, setGst] = useState('');
    const [cgst, setCgst] = useState('');
    const [stock, setStock] = useState('');
    const [store, setStore] = useState(user.store);
    const [productCode,setProductCode]=useState('')
    const [sellingPrice, setSellingPrice] = useState('')
    const [newBrand, setNewBrand] = useState(''); // State to hold the value of new brand
    const [newCategory, setNewCategory] = useState(''); // Track newly entered category
    const [isCategorySelected, setIsCategorySelected] = useState(false); // Track if category is selected from dropdown

    const [isBrandSelected, setIsBrandSelected] = useState(false); // Track if brand is selected from dropdown

    const [mrp,setMrp]=useState('')
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
        formData.append('purchasePrice',purchasePrice)
        formData.append('sellingPrice', sellingPrice)
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('MRP', mrp);
        const selectedCategory = isCategorySelected ? category : newCategory;
        formData.append('category', selectedCategory);
            const selectedBrand = brand !== '' ? brand : newBrand;
        formData.append('brand', selectedBrand);    
            formData.append('image', image);
        formData.append('gst', gst);
        formData.append('cgst', cgst);
        formData.append('stock', stock);
        formData.append('size', size)
        formData.append('store', store);
        formData.append('productCode', productCode);

        dispatch(asyncUploadProducts(formData));
        
    };

    const handleBrandInputChange = (e) => {
        setNewBrand(e.target.value);
    };

    const handleAddBrand = () => {
        // Check if the brand is already in the list
        if (!brands.includes(newBrand) && newBrand.trim() !== '') {
            setBrand(newBrand);
            setNewBrand('');
        }
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
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">MRP</label>
                    <input type="number" id="MRP" value={mrp} onChange={(e) => setMrp(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div>

                    <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Purchase Price</label>
                    <input type="number" id="purchasePrice" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div>

                    <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag:</label>
                    <input type="text" id="tag" value={size} onChange={(e) => setSize(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div>
                    <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Selling Price</label>
                    <input type="number" id="sellingPrice" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                         <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="form-select mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.link}>{cat.label}</option>
                        ))}
                    </select>

                </div>
                {/* Allow entering new category only if category is not selected from dropdown */}
                {!isCategorySelected && (
                    <div>
                        <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700">New Category</label>
                        <input
                            type="text"
                            id="newCategory"
                            value={newCategory}
                            onChange={(e) => {
                                setNewCategory(e.target.value);
                                setIsCategorySelected(false); // Category entered manually
                                setCategory(''); // Reset category dropdown
                            }}
                            className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                )}
                
                <div>
                 <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                    <select
                        id="brand"
                        value={brand}
                        onChange={(e) => {
                            setBrand(e.target.value);
                            setIsBrandSelected(true); // Brand selected from dropdown
                            setNewBrand(''); // Reset newBrand input
                        }}
                        className="form-select mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                        <option value="">Select Brand</option>
                        {brands.map((brandName, index) => (
                            <option key={index} value={brandName}>{brandName}</option>
                        ))}
                    </select>
                </div>
                {/* Allow entering new brand only if brand is not selected from dropdown */}
                {!isBrandSelected && (
                    <div>
                        <label htmlFor="newBrand" className="block text-sm font-medium text-gray-700">New Brand</label>
                        <input
                            type="text"
                            id="newBrand"
                            value={newBrand}
                            onChange={(e) => {
                                setNewBrand(e.target.value);
                                setIsBrandSelected(false); // Brand entered manually
                                setBrand(''); // Reset brand dropdown
                            }}
                            className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                )}
                
               
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
                    <label htmlFor="productCode" className="block text-sm font-medium text-gray-700">Product Code</label>
                    <input type="text" id="productCode" value={productCode} onChange={(e) => setProductCode(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
               <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                    <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} className="form-input mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="store" className="block text-sm font-medium text-gray-700">Store</label>
                    <select id="store" value={store} onChange={(e) => setStore(e.target.value)} className="form-select mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
                        <option value={user.store}>{user.store}</option>
                       
                    </select>
                </div>
                <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition-colors duration-300">Submit</button>
            </form>
        </div>
    );
};

export default AddProductForm;
