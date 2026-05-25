import React, { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'

function ProductCard({product}) {
    const { addToCart } = useCart()
    const [ added, setAdded ] = useState(false)

    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product, 1)
        setAdded(true)
        setTimeout(() => setAdded(false), 1500)
    }

    const renderStars = (rating) => {
        return(
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i} 
                        className={`w-4 h-4 
                            ${i < Math.round(rating)
                                ? 'fill-accent text-accent'
                                : 'text-muted-foreground'
                            }
                            `}
                    />
                ))}
            </div>
        )
    }

  return (
    <>
        <div className="bg-card rounded-lg  overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <Link
                to={`/product/${product.id}`}
                className="flex-1 flex flex-col group cursor-pointer"
            >
                <div className="relative w-full h-48 bg-secondary overflow-hidden">
                    <img 
                        src={product.image} 
                        alt={product.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" 
                    />
                </div>

                <div className="flex flex-1 flex-col p-4 justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2">
                            {product.title}
                        </h3>
                        <div className="flex items-center mb-3 gap-2">
                            {renderStars(product.rating.rate)}
                            <span className=" text-xs text-muted-foreground">
                                ({product.rating.count})
                            </span>
                        </div>
                    </div>

                    <div className="text-lg font-bold text-primary">
                        ${product.price.toFixed(2)}
                    </div>
                </div>
            </Link>

            <Button
                onClick={handleAddToCart}
                className={`
                            mx-4 mb-4 transition-all 
                            ${added
                                ? "bg-accent text-accent-foreground"
                                : "bg-primary text-primary-foreground hover:bg-primary/90"
                            }
                          `}
            >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {added ? "Added!" : "Add to Cart"}
            </Button>
        </div>  
    </>
  )
}

export default ProductCard
