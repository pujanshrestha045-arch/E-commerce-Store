import React, { useEffect, useState } from 'react'
import { useCart } from "../../contexts/CartContext"
import { getCategories } from "../../services/api"
import Header from "../../components/navigation/Header"
import MobileNav from "../../components/navigation/MobileNav"
import { Link } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react'
import Button from '../../ui/Button'

function CartPage() {
    const [mounted, setMounted] = useState(false)
    const [categories, setCategories] = useState([])
    const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart()

    useEffect(() => {
        setMounted(true)
        const fetchCategories = async () => {
            try {
                const data = await getCategories()
                setCategories(data)
            } catch (error) {
                console.error("Failed to fetch categories", error)
            }
        }
        fetchCategories()
    }, [])

    if (!mounted) {
        return null
    }

    const subtotal = getTotal()
    const VAT = subtotal * 0.13
    const delivery_cost = items.length > 0 ? 9.99 : 0
    const total = subtotal + VAT + delivery_cost

    return (
        <>
            <div className="min-h-screen bg-background">
                {/* Desktop Header */}
                <Header categories={categories} onCategoryClick={() => { }} />

                {/* Mobile Navigation*/}
                <MobileNav categories={categories} onSearchOpen={() => { }} />

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
                    {/* Header */}
                    <Link to={"/"} className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Continue Shopping
                    </Link>

                    <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
                            <h2 className="text-2xl font-semibold text-foreground mb-2">
                                Your cart is empty
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Add some products to get started!
                            </p>
                            <Link to={"/"}>
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Start Shopping
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="md:col-span-2 space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-card rounded-lg p-4 flex gap-4 border border-border"
                                    >
                                        {/* Product Image */}
                                        <Link to={`/product/${item.id}`} className="shrink-0">
                                            <div className="relative w-24 h-24 bg-secondary rounded-lg overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <Link
                                                to={`/product/${item.id}`}
                                                className="text-foreground hover:text-primary transition-colors font-semibold line-clamp-2"
                                            >
                                                {item.title}
                                            </Link>
                                            <p className="text-primary font-bold mt-2">
                                                {item.price.toFixed(2)}
                                            </p>

                                            {/* Quantity Control */}
                                            <div className="flex items-center gap-3 mt-3 border border-border rounded-lg bg-secondary w-fit">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id, Math.max(1, item.quantity - 1)
                                                        )
                                                    }
                                                    className="px-3 py-1 text-foreground hover:bg-input transition-colors"
                                                >
                                                    -
                                                </button>

                                                <span className="px-3 py-1 text-foreground font-medium">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id, item.quantity + 1
                                                        )
                                                    }
                                                    className="px-3 py-1 text-foreground hover:bg-input transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal and Remove */}
                                        <div className="flex flex-col items-end justify-between">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">Subtotal</p>
                                                <p className="text-lg font-bold text-foreground">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="md:col-span-1">
                                <div className="bg-card rounded-lg p-6 border border-border sticky top-24">
                                    <h2 className="text-xl text-foreground font-bold mb-6">
                                        Order Summary
                                    </h2>

                                    <div className="space-y-4 mb-6 pb-6 border-b border-border">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="text-foreground font-semibold">
                                                ${subtotal.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">VAT</span>
                                            <span className="text-foreground font-semibold">
                                                ${VAT.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Delivery Cost</span>
                                            <span className="text-foreground font-semibold">
                                                ${delivery_cost.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-muted-foreground">Total</span>
                                        <span className="text-foreground font-semibold">
                                            ${total.toFixed(2)}
                                        </span>
                                    </div>

                                    <Link to={"/checkout"} className="w-full">
                                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold">
                                            Proceed to Checkout
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="outline"
                                        className="w-full mt-3 border-border bg-transparent"
                                        onClick={clearCart}
                                    >
                                        Clear Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    )
}

export default CartPage
