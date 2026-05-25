const BASE_URL = "https://fakestoreapi.com"

export async function getProducts(category) {
    try{
        const url = category
        ? `${BASE_URL}/products/category/${encodeURIComponent(category)}`
        : `${BASE_URL}/products`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch products')
    return await response.json()
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
}

export async function getProductById(id) {
    try{
        const response = await fetch(`${BASE_URL}/products/${id}`)
        if (!response.ok) throw new Error('Failed to fetch product')
        return await response.json()    

    } catch (error) {
        console.error('Error fetching product:', error)
        throw error
    }    
}

export async function getCategories() {
    try {
        const response = await fetch(`${BASE_URL}/products/categories`)
        if (!response.ok) throw new Error('Failed to fetch categories')
        return await response.json()
    } catch(error) {
        console.error('Error fetching categories:', error)
        throw error
    }
}

export async function searchProducts(query) {
    try {
        const products = await getProducts()
        return products.filter(
            (product) => 
                product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
        )
    } catch(error) {
        console.error('Error searching products:', error)
        throw error
    }
}