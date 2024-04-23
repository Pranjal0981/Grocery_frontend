import {Routes,Route} from 'react-router-dom'
import Dashboard from '../Profile/Dashboard'
import HomePage from '../components/HomePage'
import TestComp from '../components/TestComp'

const Routing=()=>{
    return<>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/test' element={<TestComp/>}/>
    </Routes>
    
    </>
}
export default Routing