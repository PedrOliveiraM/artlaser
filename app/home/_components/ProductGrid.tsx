'use client'
import { BannersCarousel } from '@/app/home/_components/BannersCarousel'
import { SearchMenu } from '@/app/home/_components/SearchMenu'
import { IProduct } from '@/types/IProduct'
import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useCategoryContext } from '@/app/context/CategoryContext'

export type SerializedProducts = IProduct

export default function ProductGrid({ products }: { products: IProduct[] }) {
  const { selectedCategory, setSelectedCategory } = useCategoryContext()
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products)

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(
        products.filter(product => product.category === selectedCategory)
      )
    }
  }, [selectedCategory, products])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearchChange = (search: string) => {
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

      <SearchMenu data={products} handleChangeSearch={handleSearchChange} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
