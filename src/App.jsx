import { useEffect, useState } from 'react';
import './App.css';
import Nav from './Nav/Nav';
import Routing from './Routing/Routing';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from './ScrollTop';
import { asyncFetchProducts, asyncFetchStorePro } from './store/actions/productAction';
import { useLocation, useParams } from 'react-router-dom';

function App() {
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.user)
  const location = useLocation(); // Get the current pathname
 
  const params = new URLSearchParams(location.search);
  console.log(params)
  const referralCode = params.get('referralCode'); // This will extract the referralCode from the query string

  console.log('Referral Code:', referralCode);
  return (
    <>

    <ScrollToTop/>
      <Routing />
      <Footer className="overflow-hidden" />

  
    </>
  );
}

export default App;
