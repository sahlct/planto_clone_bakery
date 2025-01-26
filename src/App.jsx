import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MainHome from './Pages/MainHome';
import Cart from './Pages/Cart';
import MainHome from './Pages/mainHome';
import {Product} from './Pages/product';
import { Navbar } from './Pages/navbar';
import { SingleProduct } from './Pages/singleProduct';


function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <Routes>
          <Route path="/home" element={<MainHome />} />
          <Route path="/order" element={<Cart />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
