import {Routes,Route} from 'react-router-dom'
import Dashboard from '../Profile/Dashboard'
import FirstComp from '../FirstComp'
const Routing=()=>{
    return<>
    <Routes>
        <Route path='/' element={<FirstComp/>}/>

        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    
    </>
}
export default Routing