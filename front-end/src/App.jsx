import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Footer from './components/Footer/Footer';
import ExploreMenu from './components/ExploreMenu/ExploreMenu';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import SellOrder from './pages/SellOrder/SellOrder'
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home setShowLogin={setShowLogin} />} />
          <Route path='/cart' element={<Cart />} />
          <Route 
          path='/order' 
          element={<ProtectedRoute showLogin={showLogin}><PlaceOrder /></ProtectedRoute>} />
          <Route path='/sell' element={<ProtectedRoute showLogin={showLogin}><SellOrder /></ProtectedRoute>} />
          <Route path='/explore'
            element={
              <ProtectedRoute showLogin={showLogin}>
                <Dashboard/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
