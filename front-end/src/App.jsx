import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import LoginPopup from './components/LoginPopup/LoginPopup'
import ExploreMenu from './components/ExploreMenu/ExploreMenu'
const App = () => {
  const [showLogin , setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup/>:<></>}
    <div className='app'>
      <Navbar setShowLogin = {setShowLogin}/>
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/cart' element = {<Cart/>} />
        <Route path = '/order' element = {<PlaceOrder/>} />
        <Route path = '/explore' element = {<ExploreMenu/>}/>
      </Routes>

    </div>
  </>
  )
}

export default App
