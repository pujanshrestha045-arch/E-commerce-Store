import React, { useEffect, useState } from 'react'
import { getProducts } from '../../services/api'
import { Loader } from 'lucide-react'
import ProductCard from './ProductCard'

function ProductListing({
    category,
    searchQuery = '',
    sortBy = 'featured',
}) {
    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                setLoading(true)
                const data = await getProducts(category)
                setProducts(data)
            } catch(error) {
                console.error('Failed to fetch products:', error);
                setProducts([]);
            } finally{
                setLoading(false)
            }
        }

        fetchProducts()
    }, [category])

    useEffect(() => {
        let filtered = products

        // Filter by search query
        if(searchQuery) {
            filtered = filtered.filter(
                (product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Sort products
        if(sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price)
        } else if(sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price)
        } else if(sortBy === 'rating') {
            filtered.sort((a, b) => b.rating.rate - a.rating.rate)
        }

        setFilteredProducts(filtered)
    }, [products, searchQuery, sortBy])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    if (filteredProducts.length === 0){
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg text-muted-foreground mb-2">No Products Found</p>
                <p className="text-sm text-muted-foreground">Try adjusting filters or search items</p>
            </div>
        )}

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default ProductListing
