import {Routes,Route} from 'react-router-dom'
import Dashboard from '../Profile/Dashboard'
import FirstComp from '../FirstComp'
import Footer from '../components/Footer'
const Routing=()=>{
    return<>
    <Routes>
        <Route path='/' element={
        <>
        <FirstComp/>
        <Footer/>
        </>
        }/>

        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    
    </>
}
export default Routing