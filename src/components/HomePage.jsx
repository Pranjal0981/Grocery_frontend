import React from 'react'
import FirstComp from '../FirstComp'
import Footer from './Footer'
import ProductList from './ProductList'

function HomePage() {
  return (
    <>
    <FirstComp/>
    <ProductList/>
    <Footer className="overflow-hidden"/>
    </>
  )
}

export default HomePage
