import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/api'
import { Search, X } from 'lucide-react'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'

function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const data = await getProducts()
                setAllProducts(data)
            } catch (error) {
                console.error('Failed to fetch products:', error)
            }
        }

        fetchAllProducts()
    }, [])

    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            return
        }

        setLoading(true)
        const filtered = allProducts.filter(
            (product) =>
                product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered.slice(0, 8))
        setLoading(false)
    }, [query, allProducts])

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/50"
                onClick={onClose}
            />

            {/* Search Modal */}
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 md:pt-32">
                <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-96 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-2 p-4 border-b border-border">
                        <Search className="w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search Products..."
                            value={query}
                            onChange={(e) => { setQuery(e.target.value) }}
                            autoFocus
                            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
                        />
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={onClose}
                            className="text-foreground"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Results */}
                    <div className="overflow-y-auto flex-1">
                        {loading ? (
                            <div className="p-4 text-center text-muted-foreground">Searching...</div>
                        ) : results.length === 0 && query ? (
                            <div className="p-4 text-center text-muted-foreground">No products found</div>
                        ) : (
                            <div className="divide-border divide-y">
                                {results.map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/product/${product.id}`}
                                        onClick={onClose}
                                        className="flex gap-4 p-4 hover:bg-secondary transition-colors"
                                    >
                                        <div className="relative w-16 h-16 bg-secondary rounded-lg overflow-hidden shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-foreground line-clamp-2">{product.title}</h3>
                                            <p className="text-sm font-bold text-primary mt-1">
                                                ${product.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchModal
