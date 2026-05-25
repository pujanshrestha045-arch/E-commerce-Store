import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CartPage from './pages/cart/CartPage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import ProductPage from './pages/product/ProductPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  )
}

export default App
