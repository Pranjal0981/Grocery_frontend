import { Routes, Route, useParams } from 'react-router-dom'
import Dashboard from '../Profile/Dashboard'
import HomePage from '../components/HomePage'
import {ForgetPassword,ForgetAdminPassword,ForgetSuperAdminPassword} from '../Profile/ForgetPassword'
import ResetPassword, { ResetAdminPassword, ResetSuperAdminPassword } from '../Profile/ResetPassword'
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
import Order from '../Profile/Orders'
import SalesByStore from '../SuperAdmin/SalesByStore'
import { ShopByCategoryProduct } from '../components/Shopbycategory'
import About from '../components/About'
import ReturnPolicy from '../components/ReturnPolicy'
import FAQs from '../components/FAQs'
import CustomerCare from '../components/CustomerCare'
import ExchangePolicy from '../components/ExchangePolicy'
import SupportCenter from '../components/SupportCenter'
import ContactUs from '../components/ContactUs'
import { AdminLoginForm, AdminRegistrationForm } from '../Admin/Auth'
const Routing = () => {
    const { user, isAuth } = useSelector((state) => state.user)
    const isAdmin = isAuth && user.userType === 'Admin';
    const isUser = isAuth && user.userType === 'customer';
    const isSuperAdmin=isAuth && user.userType==='SuperAdmin'
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
            <Route path='/About Us' element={<About/>}/>
            <Route path='/brand/:title' element={<BrandProducts/>}/>
            <Route path='/Support Center' element={<SupportCenter/>}/>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/store/:store' element={<Storeproduct/>}/>
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/admin/forget-password' element={<ForgetAdminPassword />} />
            <Route path='/superadmin/forget-password' element={<ForgetSuperAdminPassword/>} />
            <Route path="/forget-link/:id" element={<ResetPassword/>} />
            <Route path="/admin/forget-link/:id" element={<ResetAdminPassword />} />
            <Route path="/superadmin/forget-link/:id" element={<ResetSuperAdminPassword />} />
            <Route path='/superadmin/allproducts' element={isSuperAdmin ? <AllProducts /> : <Unauthorized />} />
            <Route path='/admin/upload-products' element={isAdmin ? <AddProductForm /> : <Unauthorized />} />
            <Route path='/wishlist' element={isUser ? <Wishlist /> : <Unauthorized />} />
            <Route path='/products/:id' element={<ExploreProductById />} />
            <Route path='/Return Policy' element={<ReturnPolicy/>}/>
            <Route path='/FAQs' element={<FAQs/>}/>
            <Route path='/admin/register' element={<AdminRegistrationForm/>}/>
            <Route path='/admin/login' element={<AdminLoginForm/>}/>
            <Route path='/contact' element={<ContactUs/>}/>
            <Route path='/Customer Care' element={<CustomerCare/>}/>
            <Route path='/Exchange Policy' element={<ExchangePolicy/>}/>
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
            <Route path='/superadmin/fetchallusers' element={isSuperAdmin ? <AllUser /> : <Unauthorized />} />
            <Route path='/admin/fetchOutOfStockProducts' element={isAdmin ? <OutOfStock /> : <Unauthorized />} />
            <Route path='/superadmin/activeMembers' element={isSuperAdmin ? <ActiveUser /> : <Unauthorized />} />
            <Route path='/superadmin/inactiveMembers' element={isSuperAdmin ? <InactiveUser /> : <Unauthorized />} />
            <Route path='/admin/updateproduct/:id' element={isAdmin ? <UpdateProduct /> : <Unauthorized />} />
            <Route path='/superadmin/dashboard' element={isSuperAdmin ? <AdminDashboard /> : <Unauthorized />} />
            <Route path='/admin/allOrders' element={isAdmin ?<ManageOrder/>:<Unauthorized/>}/>
            <Route path='/shopbycategory/:category' element={<ShopByCategoryProduct/>}/>
            <Route path='/superAdmin/salesByStore' element={isSuperAdmin?<SalesByStore/>:<Unauthorized/>}/>
            <Route path='/orders' element={isUser?<Order/>:<Unauthorized/>}/>
        </Routes>

    </>
}
export default Routing