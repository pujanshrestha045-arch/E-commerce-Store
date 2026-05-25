import React, { useEffect, useState } from 'react'
import {useCart} from "../../contexts/CartContext"
import {getCategories} from "../../services/api"
import Header from '../../components/navigation/Header'
import MobileNav from '../../components/navigation/MobileNav'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'

function CheckoutPage() {
    const { items, getTotal, clearCart } = useCart()
    const [mounted, setMounted] = useState(false)
    const [categories, setCategories] = useState([])
    const [step, setStep] = useState('checkout')
    const [loading, setLoading] = useState(false)

    //   Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        setMounted(true)
        const fetchCategories = async () => {
            try {
                const data = await getCategories()
                setCategories(data)
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            }
        }
        fetchCategories()
    }, [])

    const validateForm = () => {
        const newErrors = {}

        if (!formData.firstName.trim())
            newErrors.firstName = "First name is required"
        if (!formData.lastName.trim())
            newErrors.lastName = "Last name is required"
        if (!formData.email.trim())
            newErrors.email = "Email is required"
        if (!formData.phone.trim())
            newErrors.phone = "Phone number is required"
        if (!formData.firstName.trim())
            newErrors.address = "Address is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return;

        setLoading(true)
        // Simulate Payment Processing
        setTimeout(() => {
            setLoading(false)
            setStep('success')
            clearCart()
        }, 2000)
    }

    if (!mounted) {
        return null
    }

    const subtotal = getTotal()
    const VAT = subtotal * 0.13
    const delivery_cost = items.length > 0 ? 9.99 : 0
    const total = subtotal + VAT + delivery_cost

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-background">
                <Header categories={categories} onCategoryClick={() => { }} />
                <MobileNav categories={categories} onSearchOpen={() => { }} />

                <main className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
                    <div className="max-w-md mx-auto text-center py-16">
                        <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Order Confirmed!
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            Thank you for the purchase. Your order has been successfully placed.
                        </p>
                        <p className="text-sm text-muted-foreground mb-8">
                            You will recieve a confirmation email shortly.
                        </p>

                        <Link to={"/"}>
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Header categories={categories} onCategoryClick={() => { }} />
                <MobileNav categories={categories} onSearchOpen={() => { }} />

                <main className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
                    <Link to={"/"} className="flex items-centergap-2 text-primary hover:text-primary/80 mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Cart
                    </Link>

                    <div className="text-center py-16">
                        <p className="text-lg text-muted-foreground">
                            Your cart is empty. Add items to proceed with checkout.
                        </p>
                        <Link to={"/"} className="mt-6 inline-block">
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">

                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <>
            <div className="min-h-screen bg-background">
                <Header categories={categories} onCategoryClick={() => { }} />
                <MobileNav categories={categories} onSearchOpen={() => { }} />

                <main className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
                    <Link to={"/"} className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 ">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Cart
                    </Link>

                    <h1 className="text-3xl font-bold text-foregroundmb-8">Checkout</h1>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-8">
                            {/* Delivery Information */}
                            <div className="bg-card rounded-lg p-6 border border-border">
                                <h2 className="text-xl font-bold text-foreground mb-6">
                                    Delivery Information
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-2 py-4 border rounded-lg bg-secondary text-foreground placeholder-muted-foreground focus:outline=none focus:ring-2 focus:ring-primary ${errors.firstName ? 'border-destructive' : 'border-border'
                                                }`}
                                            placeholder='John'
                                        />
                                        {errors.firstName && (
                                            <p className="text-destructive text-sm mt-1">
                                                {errors.firstName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-2 py-4 border rounded-lg bg-secondary text-foreground placeholder-muted-foreground focus:outline=none focus:ring-2 focus:ring-primary ${errors.lastName ? 'border-destructive' : 'border-border'
                                                }`}
                                            placeholder='Doe'
                                        />
                                        {errors.lastName && (
                                            <p className="text-destructive text-sm mt-1">
                                                {errors.lastName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-2 py-4 border rounded-lg bg-secondary text-foreground placeholder-muted-foreground focus:outline=none focus:ring-2 focus:ring-primary ${errors.email ? 'border-destructive' : 'border-border'
                                                }`}
                                            placeholder='john@example.com'
                                        />
                                        {errors.email && (
                                            <p className="text-destructive text-sm mt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-2 py-4 border rounded-lg bg-secondary text-foreground placeholder-muted-foreground focus:outline=none focus:ring-2 focus:ring-primary ${errors.phone ? 'border-destructive' : 'border-border'
                                                }`}
                                            placeholder='(012) 345-6789'
                                        />
                                        {errors.phone && (
                                            <p className="text-destructive text-sm mt-1">
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={`w-full px-2 py-4 border rounded-lg bg-secondary text-foreground placeholder-muted-foreground focus:outline=none focus:ring-2 focus:ring-primary ${errors.address ? 'border-destructive' : 'border-border'
                                                }`}
                                            placeholder='123 Street'
                                        />
                                        {errors.address && (
                                            <p className="text-destructive text-sm mt-1">
                                                {errors.address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Button
                                disabled={loading}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold"
                            >
                                {loading ? "Processing..." : "Place Order"}
                            </Button>
                        </form>

                        {/* Order Summary */}
                        <div>
                            <div className="bg-card rounded-lg p-6 border border-border sticky top-24">
                                <h2 className="text-xl font-bold text-foreground mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <div className="relative w-16 h-16 bg-secondary rounded-lg overflow-hidden shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-foreground line-clamp-2">
                                                    {item.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.quantity}
                                                </p>
                                                <p className="text-sm font-bold text-primary">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pb-6 border-b border-border">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="text-foreground font-semibold">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">VAT(13%)</span>
                                        <span className="text-foreground font-semibold">
                                            ${VAT.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Delivery Charge</span>
                                        <span className="text-foreground font-semibold">
                                            ${delivery_cost.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total</span>
                                    <span className="text-foreground font-semibold">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default CheckoutPage
