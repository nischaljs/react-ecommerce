import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import OutletLayout from './layouts/OutletLayout';
import HomePage from './pages/HomePage';
import SingleProductPage from './pages/SingleProductPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { SearchProvider } from './context/SearchContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <Routes>
                <Route path="/" element={<OutletLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="product/:productId" element={<SingleProductPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="wishlist" element={<WishlistPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="login" element={<LoginPage />} />
                </Route>
              </Routes>
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
