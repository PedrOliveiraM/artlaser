'use client'
import { BannersCarousel } from '@/app/home/_components/BannersCarousel'
import { SearchMenu } from '@/app/home/_components/SearchMenu'
import { IProduct } from '@/types/IProduct'
import { useState } from 'react'
import ProductCard from './ProductCard'

export type SerializedProducts = IProduct

export default function ProductGrid({ products }: { products: IProduct[] }) {
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
