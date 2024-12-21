'use client'
import { useToast } from '@/hooks/use-toast'
import { Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import ProductGrid from './_components/ProductGrid'
import { BannersCarousel } from './_components/BannersCarousel'
import { WhatsappButton } from './_components/WhatsappButton'
import Loading from '@/components/loading'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/products')
        const products = await response.json()
        setProducts(products)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
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

  if (isLoading) return <Loading />

  return (
    <main className="min-h-screen">
      <BannersCarousel />
      <div className="container mx-auto px-4 md:py-4">
        <ProductGrid products={serializedProducts} />
        <WhatsappButton />
      </div>
    </main>
  )
}
