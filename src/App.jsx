import { useState } from 'react'
import './App.css'
import Nav from './Nav/Nav'
import FirstComp from './FirstComp'
import Routing from './Routing/Routing'
import Footer from './components/Footer'

function App() {
 
  return <>


  <Nav/>
    <Routing />
    <Footer className="overflow-hidden" />

  </>
}

export default App
