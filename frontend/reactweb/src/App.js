import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';        
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import LoginForm from './components/LoginForm';
import PosIndex from './features/pos/components/PosIndex';
import ProductIndex from './features/products/components/ProductIndex';
import ProtectedRoute from './utils/ProtectedRoute';
import CartIndex from './features/carts/CartIndex';
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/shopping" element={<CartIndex />} />
        <Route path="/product" element={
          <ProtectedRoute>
            <ProductIndex />
          </ProtectedRoute>} />
        <Route path="/pos" element={
          <ProtectedRoute>
            <PosIndex />
          </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
export default App;


