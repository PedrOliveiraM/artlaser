'use client'
import { IProduct } from '@/types/IProduct'
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { useCategoryContext } from '@/app/context/CategoryContext'
import { SearchMenu } from '@/app/home/_components/SearchMenu'
import { Button } from '@/components/ui/button'

export default function ProductGrid({ products }: { products: IProduct[] }) {
  const { selectedCategory, setSelectedCategory } = useCategoryContext()
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(
        products.filter(product => product.category === selectedCategory)
      )
    }
    setCurrentPage(1) 
  }, [selectedCategory, products])

  const handleSearchChange = (search: string) => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    )
    setCurrentPage(1) 
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="flex flex-col justify-center">
      <SearchMenu data={products} handleChangeSearch={handleSearchChange} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-6">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <span className="px-4">
          Página {currentPage} de {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima
        </Button>
      </div>
    </div>
  )
}
