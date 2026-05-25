import React, { useEffect, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useCart } from '../../contexts/CartContext'
import Button from '../../ui/Button'
import { Link } from 'react-router-dom'
import { ShoppingCart, Sun, Moon } from 'lucide-react'

function Header({ categories, onCategoryClick }) {
    const { theme, toggleTheme } = useTheme()
    const { getItemCount } = useCart()
    const [ itemCount, setItemCount ] = useState(0)
    const [ mounted, setMounted ] = useState(false)
    const [ searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        setItemCount(getItemCount())
        setMounted(true)
    }, [getItemCount])

    useEffect(() => {
        
    })

    return (
        <>
            <header className='sticky top-0 z-50 bg-background border-b border-border hidden md:block'>
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* Top Row: Logo Search Actions */}
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/" className="text-2xl font-bold text-primary">
                            Shop
                        </Link>

                        <input
                            type='text'
                            placeholder='Search items...'
                            className='flex-1 mx-8 px-2 py-2 bg-secondary rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="text-foreground"
                            >
                                {theme === "light" ? (
                                    <Moon className="w-5 h-5" />
                                ) : (<Sun className="w-5 h-5" />
                                )}
                            </Button>

                            <Link to="/cart">
                                <Button variant="ghost" className="relative text-foreground">
                                    <ShoppingCart className='w-5 h-5' />
                                    {mounted && itemCount > 0 && (
                                        <span className='absolute top-0 right-0 -mt-2 -mr-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                                            {itemCount}
                                        </span>
                                    )}
                                </Button>
                            </Link>
                        </div>

                    </div>

                    {/* Category Tab */}
                    <div className="flex gap-6 overflow-x-auto pb-2">
                        <Button
                            onClick={() => onCategoryClick('')}
                            className="text-sm font-medium whitespace-nowrap text-foreground hover:text-primary transition-colors"
                        >
                            All Products
                        </Button>
                        {categories?.map((category) => (
                            <Button
                                key={category}
                                onClick={() => onCategoryClick(category)}
                                className="text-sm font-medium whitespace-nowrap text-foreground hover:text-primary transition-colors capitalize"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
