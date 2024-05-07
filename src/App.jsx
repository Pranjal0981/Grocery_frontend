import { useEffect, useState } from 'react';
import './App.css';
import Nav from './Nav/Nav';
import Routing from './Routing/Routing';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import ScrollToTop from './ScrollTop';

function App() {
  const {user}=useSelector((state)=>state.user)
  console.log(user?.userType)
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
