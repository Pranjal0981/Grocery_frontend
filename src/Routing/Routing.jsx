import { Routes, Route, useParams } from 'react-router-dom'
import Dashboard from '../Profile/Dashboard'
import HomePage from '../components/HomePage'
import ForgetPassword from '../Profile/ForgetPassword'
import ResetPassword from '../Profile/ResetPassword'
import { useSelector } from 'react-redux'
import NotFound from '../components/NotFound'
import ProductStore from '../Admin/ProductStore'
import Unauthorized from '../Unauthorized'
import AllProducts from '../Admin/AllProducts'
import AddProductForm from '../Admin/UploadProducts'
import ExploreProductById from '../components/ExploreProductById'
import Wishlist from '../Profile/WIshlist'
import CategoryProduct from '../components/CategorisedProduct'
import SearchResult from '../components/SearchResult'
import Cart from '../Profile/Cart'
import UpdateProduct from '../Admin/UpdateProduct'
import Storeproduct from '../components/FetchByStore'
import Product from '../components/Product'
import { Address, AddressForm } from '../Profile/Address'
import AccountDetails from '../Profile/AccountDetails'
import AllUser from '../SuperAdmin/AllUsers'
import OutOfStock from '../Admin/OutOfStock'
import { ActiveUser, InactiveUser } from '../SuperAdmin/ActivityLogs'
import AdminDashboard from '../SuperAdmin/Dashboard'
import BrandProducts from '../components/BrandProduct'
import ManageOrder from '../Admin/AllOrders'
const Routing = () => {
    const { user, isAuth } = useSelector((state) => state.user)
    const isAdmin = isAuth && user.userType === 'Admin';
    const isUser = isAuth && user.userType === 'customer';
    const { id } = useParams();
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
        // Add more categories as needed
    ];
    return <>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/brand/:title' element={<BrandProducts/>}/>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path="/forget-link/:id" element={<ResetPassword userType="user" />} />
            <Route path={`/admin/stores/:store`} element={<ProductStore />} />
            <Route path='/admin/allproducts' element={isAdmin ? <AllProducts /> : <Unauthorized />} />
            <Route path='/admin/upload-products' element={isAdmin ? <AddProductForm /> : <Unauthorized />} />
            <Route path='/wishlist' element={isUser ? <Wishlist /> : <Unauthorized />} />
            <Route path='/products/:id' element={<ExploreProductById />} />
            {categories.map((category, index) => (
                <Route key={index} path={`/category/:category`} element={<CategoryProduct />} />
            ))}
            <Route path='*' element={<NotFound />} />
            <Route path="/search-results" element={<SearchResult />} />
            <Route path='/cart' element={isUser ? <Cart /> : <Unauthorized />} />
            <Route path='/edit-address' element={<AddressForm />} />
            <Route path='/address' element={<Address />} />
            <Route path='/admin/store/:store' element={<ProductStore />} />
            <Route path='/shop' element={<Product />} />
            <Route path='/account-details' element={<AccountDetails />} />
            <Route path='/admin/fetchallusers' element={isAdmin ? <AllUser /> : <Unauthorized />} />
            <Route path='/admin/fetchOutOfStockProducts' element={isAdmin ? <OutOfStock /> : <Unauthorized />} />
            <Route path='/admin/activeMembers' element={isAdmin ? <ActiveUser /> : <Unauthorized />} />
            <Route path='/admin/inactiveMembers' element={isAdmin ? <InactiveUser /> : <Unauthorized />} />
            <Route path='/admin/updateproduct/:id' element={isAdmin ? <UpdateProduct /> : <Unauthorized />} />
            <Route path='/admin/dashboard' element={isAdmin ? <AdminDashboard /> : <Unauthorized />} />
            <Route path='/admin/allOrders' element={isAdmin ?<ManageOrder/>:<Unauthorized/>}/>
        </Routes>

    </>
}
export default Routing