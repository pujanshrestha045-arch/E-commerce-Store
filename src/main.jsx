import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
