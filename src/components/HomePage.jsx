import React from 'react'
import FirstComp from '../FirstComp'
import Footer from './Footer'
import {Shopbycategory} from './Shopbycategory'
import Div3 from './Div3'
import Div4 from './Div4'
import Shopbybrand from './Shopbybrand'
import {Product} from './Product'
function HomePage() {
  return (
    <>
    <FirstComp/>
    <Shopbycategory/>
    <Div3/>
    <Div4/>
    <Shopbybrand/>
    </>
  )
}

export default HomePage
