import React, { useEffect, useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'
import { Grid, Home, Moon, Search, ShoppingCart, Sun, X } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

function MobileNav({categories, onSearchOpen}) {
    const { theme, toggleTheme } = useTheme()
    const { getItemCount } = useCart()
    const [ itemCount, setItemCount ] = useState(0)
    const [ showCategories, setShowCategories ] = useState(false)
    const [ mounted, setMounted] = useState(false)

    useEffect(() => {
        setItemCount(getItemCount())
        setMounted(true)
    }, [getItemCount])

  return (
    <>
    {/* Mobile Button Navigation */}
        <nav className='fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden'>
            <div className="flex items-center justify-around">
                <Link to={"/"}>
                    <Button variant='ghost' className='flex-1 rounded-none'>
                        <Home className='w-5 h-5' />
                    </Button>
                </Link>

                <Button
                    variant='ghost'
                    className='flex-1 rounded-none'
                    onClick={() => setShowCategories(!showCategories)}
                >
                    <Grid className='w-6 h-6' />
                </Button>

                <Button
                    variant='ghost'
                    className='flex-1 rounded-none'
                    onClick={onSearchOpen}
                >
                    <Search className='w-6 h-6' />
                </Button>

                <Link to={"/cart"}>
                    <Button variant='ghost' className='relative flex-1 rounded-none'>
                        <ShoppingCart className='w-6 h-6' />
                        {mounted && itemCount>0 && (
                            <span className='absolute top-0 right-2 -mt-2 -mr-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                                {itemCount}
                            </span>
                        )}
                    </Button>
                </Link>

                <Button 
                    variant='ghost'
                    className='flex-1 rounded-none'
                    onClick={toggleTheme}
                >
                    {theme === 'light' ? (
                        <Moon className='w-6 h-6' />
                    ) : (
                        <Sun className='w-6 h-6' />
                    )}
                </Button>
            </div>
        </nav>

        {/* Categories Slide-up Panel */}
        {showCategories && (
            <div 
                className="fixed inset-0 z-40 bg-black/50 md:hidden"
                onClick={() => setShowCategories(false)}
            />
        )}
        <div className={`fixed bottom-16 left-0 right-0 z-40 bg-background rounded-t-2xl transition-all md:hidden ${
            showCategories ? 'max-h-96' : 'max-h-0'
        } overflow-hidden`}
        >
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className='text-lg font-semibold'>Categories</h3>
                    <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setShowCategories(false)}
                    >
                        <X className='w-5 h-5'/>
                    </Button>
                </div>
                <div className="space-y-2">
                    <Link 
                        to={"/"}
                        onClick={() => setShowCategories(false)}
                        className='px-4 py-2 block text-foreground hover:bg-secondary capitalize rounded-lg'
                    >
                        All Products
                    </Link>
                    {categories.map((category) => (
                        <Link 
                            key={category}
                            to={`/?category=${category}`}
                            onClick={() => setShowCategories(false)}
                            className='px-4 py-2 block text-foreground hover:bg-secondary capitalize rounded-lg'
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default MobileNav
