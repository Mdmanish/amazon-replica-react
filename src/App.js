import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Home from './components/Home/Home';
import ItemMainPage from './components/Items/ItemMainPage';
import { Cart, CartMainPage } from './components/Cart/Cart';
import Address from './components/Address/Address';
import Payment from './components/Payments/Payment';
import Booking from './components/Booking/Booking';
import Order from './components/Order/Order';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:productId" element={<ItemMainPage />} />
        <Route path="/cart-added" element={<Cart />} />
        <Route path="/cart/items" element={<CartMainPage />} />
        {/* <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} /> */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
