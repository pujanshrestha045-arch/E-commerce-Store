import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
    const [items, setItems] = useState([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        //Load cart from localStorage
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            try {
                setItems(JSON.parse(storedCart))
            } catch (error) {
                console.error('Failed to load cart', error)
            }
        }
        setMounted(true)
    }, [])

    useEffect(() => {
        //Save cart to localStorage whenever it changes
        if (mounted) {
            localStorage.setItem('cart', JSON.stringify(items))
        }
    }, [items, mounted])

    const addToCart = (product, quantity) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id)
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [
                ...prevItems,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity,
                    image: product.image,
                },
            ]
        })
    }

    const removeFromCart = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id)
            return
        }
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const getTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    const getItemCount = () => {
        return items.reduce((count, item) => count + item.quantity, 0)
    }

    return (
        <>
            <CartContext.Provider
                value={{
                    items,
                    addToCart,
                    removeFromCart,
                    updateQuantity,
                    clearCart,
                    getTotal,
                    getItemCount,
                }}
            >
                {children}
            </CartContext.Provider>
        </>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}


