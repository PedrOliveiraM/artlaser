'use client'
import { useToast } from '@/hooks/use-toast'
import { Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import ProductGrid from './_components/ProductGrid'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const products = await response.json()
        setProducts(products)
      } catch (error) {
        toast({
          title: 'Erro ao buscar produtos',
          description: 'Tente novamente mais tarde',
        })
      }
    }

    fetchProducts()
  }, [])

  const serializedProducts = products.map(product => ({
    ...product,
    retailPrice: parseFloat(product.retailPrice.toString()),
    wholesalePrice: parseFloat(product.wholesalePrice.toString()),
  }))

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <ProductGrid products={serializedProducts} />
      </div>
    </main>
  )
}
