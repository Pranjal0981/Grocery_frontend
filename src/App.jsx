import { useEffect, useState } from 'react';
import './App.css';
import Nav from './Nav/Nav';
import Routing from './Routing/Routing';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from './ScrollTop';
import { asyncFetchProducts, asyncFetchStorePro } from './store/actions/productAction';

function App() {
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.user)
 
  return (
    <>
    <ScrollToTop/>
      <Nav />
      <Routing />
      <Footer className="overflow-hidden" />

  
    </>
  );
}

export default App;
