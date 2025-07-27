import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ Only use Routes here
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './context/ProtectedRoute';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { CartProvider } from './context/CartContext';
import './styles/global.css';

// Lazy-loaded components
const Home = lazy(() => import('./components/Home'));
const ProductListing = lazy(() => import('./components/ProductListing'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const OrderHistory = lazy(() => import('./components/OrderHistory'));

function App() {
  return (
    <CartProvider>
      <Navbar />
      <main id="main-content" className="main-content">
        <Suspense fallback={<div className="spinner-container"><div className="spinner"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
