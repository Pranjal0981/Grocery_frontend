import React from 'react'
import FirstComp from '../FirstComp'
import Footer from './Footer'
import ProductList from './ProductList'
import Shopbycategory from './Shopbycategory'
import Div3 from './Div3'
import Div4 from './Div4'
import Shopbybrand from './Shopbybrand'



function HomePage() {
  return (
    <>
    <FirstComp/>
    <ProductList/>
    <Shopbycategory/>
    <Div3/>
    <Div4/>
    <Shopbybrand/>

    <Footer className="overflow-hidden"/>
    </>
  )
}

export default HomePage
