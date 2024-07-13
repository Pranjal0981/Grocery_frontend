import { Routes, Route, useParams } from 'react-router-dom'
import Dashboard from '../Profile/Dashboard'
import HomePage from '../components/HomePage'
import {ForgetPassword,ForgetAdminPassword,ForgetSuperAdminPassword, ForgetStoreManagerPassword} from '../Profile/ForgetPassword'
import { ResetPassword, ResetAdminPassword, ResetSuperAdminPassword, ResetStoreManagerPassword } from '../Profile/ResetPassword'
import { useSelector } from 'react-redux'
import NotFound from '../components/NotFound'
import ProductStore from '../Admin/ProductStore'
import Unauthorized from '../Unauthorized'
import AllProducts from '../StoreManager/AllProducts'
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
import  SuperAdminForm  from '../SuperAdmin/Auth'
import { StoreManagerLogin, StoreManagerRegister } from '../StoreManager/Auth'
import PrivacyPolicy from '../components/PrivacyPolicy'
import UserQuery from '../SuperAdmin/UserQuery'
import AllProductsBystore from '../StoreManager/AllProducts'
import { Business } from '@mui/icons-material'
import DeliveryInformation from '../components/DeliveryInfo'
import TermsAndConditions from '../components/TermsandCondition'
import PaymentSuccessPage from '../Profile/PaymentSuccess'
import GenerateReferralLink from '../Profile/Referral'
import Nav from '../Nav/Nav'
import Wallet from '../Profile/Wallet'
import ManagePermissions from '../SuperAdmin/ManagePermissions'
import ManageAdmin from '../SuperAdmin/ManageAdmin'
const Routing = () => {
    
    const { user, isAuth } = useSelector((state) => state.user)
    const isAdmin = isAuth && user?.userType === 'Admin'  ;
    const {store}=useParams()
    console.log(store)
    const isStoreManager=isAuth && user?.userType==='Storemanager'
    const isUser = isAuth && user?.userType === 'customer';
    const isSuperAdmin=isAuth && user?.userType==='SuperAdmin'
    const { id,referralCode } = useParams();
    console.log(referralCode)
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
    <Nav/>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/About Us' element={<About/>}/>
            <Route path='/brand/:title' element={<BrandProducts/>}/>
            <Route path='/Support Center' element={<SupportCenter/>}/>
            <Route path='/dashboard' element={isUser ?<Dashboard />:<Unauthorized/>} />
            <Route path='/wallet' element={isUser ?<Wallet />:<Unauthorized/>} />
            {/* <Route path='/superadmin/manageadmin' element={isSuperAdmin?} */}
            <Route path='/store/:store' element={<Storeproduct/>}/>
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/storemanager/login' element={<StoreManagerLogin/>}/>
            <Route path='/store/allproducts/:store' element={isSuperAdmin || isStoreManager? <AllProductsBystore />:<Unauthorized/>} />
            <Route path='/superadmin/stores/:store' element={isSuperAdmin ?<AllProductsBystore />:<Unauthorized/>} />
            <Route path='/storemanager/register' element={<StoreManagerRegister/>}/>
            <Route path='/storemanager/forget-password' element={<ForgetStoreManagerPassword />} />
            <Route path="/storemanager/forget-link/:id" element={<ResetStoreManagerPassword />} />
            <Route path='/superadmin/forget-password' element={<ForgetSuperAdminPassword/>} />
            <Route path='/superadmin/orders/:store' element={isSuperAdmin ?< ManageOrder/>:<Unauthorized/>} />
            <Route path='/superadmin/managepermissions' element={isSuperAdmin?< ManagePermissions />:<Unauthorized/>} />
            <Route path='/superadmin/login' element={<SuperAdminForm isLogin={true}/>}/>
            <Route path='/superadmin/register' element={<SuperAdminForm isLogin={false} />}/>
            <Route path="/forget-link/:id" element={<ResetPassword/>} />
            <Route path='/admin/forget-password' element={<ForgetAdminPassword />} />
            <Route path="/admin/forget-link/:id" element={<ResetAdminPassword />} />
            <Route path='/superadmin/getUserQuery' element={isSuperAdmin ?<UserQuery/>:<Unauthorized/>}/>
            <Route path="/superadmin/forget-link/:id" element={<ResetSuperAdminPassword />} />
            <Route path='/superadmin/allproducts' element={isSuperAdmin ? <AllProducts /> : <Unauthorized />} />
            <Route path='/admin/upload-products' element={isAdmin || isSuperAdmin ? <AddProductForm /> : <Unauthorized />} />
            <Route path='/superadmin/manageadmin' element={isSuperAdmin?<ManageAdmin/>:<Unauthorized/>}/>
            <Route path='/wishlist' element={isUser ? <Wishlist /> : <Unauthorized />} />
            <Route path='/products/:id' element={<ExploreProductById />} />
            <Route path='/Return Policy' element={<ReturnPolicy/>}/>
            <Route path='/Terms & Conditions' element={<TermsAndConditions/>}/>
            <Route path='/FAQs' element={<FAQs/>}/>
            <Route path='/admin/register' element={<AdminRegistrationForm/>}/>
            <Route path='/admin/login' element={<AdminLoginForm/>}/>
            <Route path='/contact' element={<ContactUs/>}/>
            <Route path='/RGS Store Business' element={<Business/>}/>
            <Route path='/Customer Care' element={<CustomerCare/>}/>
            <Route path='/Exchange Policy' element={<ExchangePolicy/>}/>
            <Route path='/Delivery Information' element={<DeliveryInformation/>}/>
            <Route path='/Privacy Policy' element={<PrivacyPolicy/>}/>
            {categories.map((category, index) => (
                <Route key={index} path={`/category/:category`} element={<CategoryProduct />} />
            ))}
            <Route path='*' element={<NotFound />} />
            <Route path="/search-results" element={<SearchResult />} />
            
            <Route path='/cart' element={isUser ? <Cart /> : <Unauthorized />} />
            <Route path='/edit-address' element={isUser?<AddressForm />:<Unauthorized/>} />
            <Route path='/address' element={isUser ?<Address />:<Unauthorized/>} />
            <Route path='/referral' element={isUser ?<GenerateReferralLink />:<Unauthorized/>} />
            <Route path='/referral-link/:referralCode' element={<HomePage/>}/>
            <Route path='/stores/fetchProducts/:store' element={isAdmin || isSuperAdmin? <ProductStore />:<Unauthorized/>} />
            <Route path='/shop' element={<Product />} />
            <Route path='/account-details' element={<AccountDetails />} />
            <Route path='/superadmin/fetchallusers' element={isSuperAdmin ? <AllUser /> : <Unauthorized />} />
            <Route path='/admin/fetchOutOfStockProducts' element={isAdmin || isSuperAdmin ? <OutOfStock /> : <Unauthorized />} />
            <Route path='/superadmin/activeMembers' element={isSuperAdmin ? <ActiveUser /> : <Unauthorized />} />
            <Route path='/superadmin/inactiveMembers' element={isSuperAdmin ? <InactiveUser /> : <Unauthorized />} />
            <Route path='/admin/update-product/:id' element={isAdmin || isSuperAdmin ? <UpdateProduct /> : <Unauthorized />} />
            <Route path='/superadmin/dashboard' element={isSuperAdmin ? <AdminDashboard /> : <Unauthorized />} />
            <Route path='/admin/allOrders/:store' element={isAdmin || isSuperAdmin ?<ManageOrder/>:<Unauthorized/>}/>
            <Route path='/superAdmin/managepermissions' element={  <ManagePermissions /> } />

            <Route path='/store/allOrders/:store' element={isStoreManager ? <ManageOrder /> : <Unauthorized />} />
            <Route path='/all-departments' element={<Product/>}/>
            <Route path='/shopbycategory/:category' element={<ShopByCategoryProduct/>}/>
            <Route path='/superAdmin/salesByStore' element={isSuperAdmin?<SalesByStore/>:<Unauthorized/>}/>
            <Route path='/orders' element={isUser?<Order/>:<Unauthorized/>}/>
            <Route path="/payment/success" element={isUser?<PaymentSuccessPage/>:<Unauthorized/>}/>

        </Routes>

    </>
}
export default Routing