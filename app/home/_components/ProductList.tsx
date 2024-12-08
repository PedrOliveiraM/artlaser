'use client'
import { useState } from 'react'
import { ProductItem } from './ProductItem'
import { SearchMenu } from './SearchMenu'
import { BannersCarousel } from './BannersCarousel'

export interface SerializedProducts {
  retailPrice: number
  wholesalePrice: number
  name: string
  id: number
  description: string
  category: string
  minQuantity: number
  imageUrl: string
  status: boolean
  CreatedAt: Date
}

export function ProductList({ products }: { products: SerializedProducts[] }) {
  const [filteredProducts, setFilteredProducts] = useState<SerializedProducts[]>(products)

  const handleSelectCategory = (category: string) => {
    if (!category) return setFilteredProducts(products)
    setFilteredProducts(products.filter(product => product.category === category))
  }

  const handleChangeSearch = (search: string) => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="relative w-full max-w-7xl mx-auto">
        <BannersCarousel />
      </div>

      <SearchMenu
        data={products}
        handleSelectCategory={handleSelectCategory}
        handleChangeSearch={handleChangeSearch}
      />
      <div className="grid grid-cols-2 mx-auto max-w-7xl mb-16 gap-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
