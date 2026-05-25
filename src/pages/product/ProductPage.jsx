import React, { useEffect, useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { getProductById, getProducts } from '../../services/api'
import Header from '../../components/navigation/Header'
import MobileNav from '../../components/navigation/MobileNav'
import { ArrowLeft, Loader, ShoppingCart, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../ui/Button'
import ProductCard from "../../components/products/ProductCard"


function ProductPage({ params }) {
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const [categories, setCategories] = useState([])
  const { addToCart } = useCart()
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const productData = await getProductById(parseInt(id))
        setProduct(productData)

        //Fetch related products
        const allProducts = await getProducts(productData.category)
        const related = allProducts
          .filter((p) => p.id !== productData.id)
          .slice(0, 4)
        setRelatedProducts(related)

        //Fetch category
        const cat = await getProducts()
        const uniqueCategories = Array.from(
          new Set(cat.map((p) => p.category))
        )
        setCategories(uniqueCategories)
      } catch (error) {
        console.log("Failed to fetch products", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    }
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < Math.round(rating)
                  ? "fill-accent text-accent"
                  : "text-muted-foreground"
                }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">
          {rating.toFixed(1)} out of 5
        </span>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Desktop Header */}
        <Header categories={categories} onCategoryClick={() => { }} />

        {/* Mobile Navigation */}
        <MobileNav categories={categories} onSearchOpen={() => { }} />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : product ? (
            <>
              <Link to={"/"} className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </Link>

              {/* Product Details */}
              <div className="grid md:grid-cols-2 gap-8 md-12">
                {/* Image */}
                <div className="bg-secondary rounded-lg overflow-hidden flex items-center justify-center min-h-96">
                  <img
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="object-contain p-8"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-foreground rounded-full capitalize">
                        {product.category}
                      </span>

                      <h1 className="text-3xl font-bold text-foreground mb-4">
                        {product.title}
                      </h1>

                      <div className="mb-6">
                        {renderStars(product.rating.rate)}
                        <p className="text-sm text-muted-foreground mt-2">
                          {product.rating.count} reviews
                        </p>
                      </div>

                      <p className="text-muted-foreground text-base leading-relaxed mb-8">
                        {product.description}
                      </p>

                      <div className="text-4xl font-bold text-primary mb-8">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Add to Cart Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-foreground">
                          Quantity:
                        </label>
                        <div className="flex items-center border border-border rounded-lg bg-secondary">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity-1))}
                            className="px-4 py-2 text-foreground hover:bg-input transition-colors"
                          >
                            -
                          </button>
                          <span className='px-6 py-2 text-foreground font-medium'>
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity+1)}
                            className="px-4 py-2 text-foreground hover:bg-input transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <Button 
                        onClick={handleAddToCart}
                        className={`w-full py-6 text-lg font-semibold transition-all ${
                          added
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        {added ? 'Added to Cart!' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Related Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {relatedProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Product not found
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default ProductPage
