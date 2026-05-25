import React, { useEffect, useState } from 'react'
import { getCategories } from '../services/api'
import Header from '../components/navigation/Header'
import MobileNav from '../components/navigation/MobileNav'
import { Loader } from 'lucide-react'
import ProductListing from '../components/products/ProductListing'
import SearchModal from '../components/SearchModal'

function Home() {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('featured')
    const [searchModalOpen, setSearchModalOpen] = useState(false)
    const [loadingCategories, setLoadingCategories] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories()
                setCategories(data)
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            } finally {
                setLoadingCategories(false)
            }
        }

        fetchCategories()
    }, [])

    return (
        <>
            <div className="min-h-screen bg-background">
                {/* Desktop Header */}
                {!loadingCategories && (
                    <Header categories={categories} onCategoryClick={setSelectedCategory} />
                )}

                {/* Mobile Navigation */}
                {!loadingCategories && (
                    <MobileNav categories={categories} onSearchOpen={() => setSearchModalOpen(true)} />
                )}

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
                    {loadingCategories ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <>
                            {/* Filters and Sorting */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                                <div>
                                    <h1 className="text-3xl font-bold text-foreground">
                                        {selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : "Shop All Products"}
                                    </h1>
                                    <p className="text-muted-foreground text-sm mt-1">
                                        Discover our collection
                                    </p>
                                </div>

                                {/* Set Dropdown */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 bg-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-border"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price:High to Low</option>
                                    <option value="price-high">Price:Low to High</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>

                            {/* Product Grid */}
                            <ProductListing
                                category={selectedCategory || undefined}
                                searchQuery={searchQuery}
                                sortBy={sortBy}
                            />
                        </>
                    )}
                </main>

                {/* Search Modal */}
                <SearchModal
                    isOpen={searchModalOpen}
                    onClose={()=>setSearchModalOpen(false)}
                />
            </div>
        </>
    )
}

export default Home
