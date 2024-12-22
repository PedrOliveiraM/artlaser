'use client'
import { useToast } from '@/hooks/use-toast'
import { Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import ProductGrid from './_components/ProductGrid'
import { BannersCarousel } from './_components/BannersCarousel'
import { WhatsappButton } from './_components/WhatsappButton'
import { SkeletonHomePage } from './_components/SkeletonHomePage'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(true)

  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const products = await response.json()
        setProducts(products)
        setIsLoaded(false)
      } catch (error) {
        setIsLoaded(false)
        toast({
          title: 'Erro ao buscar produtos',
          description: 'Tente novamente mais tarde',
        })
      }
    }

    fetchProducts()
  }, [])

  const serializedProducts = products
    .filter(product => product.status === true)
    .map(product => ({
      ...product,
      retailPrice: parseFloat(product.retailPrice.toString()),
      wholesalePrice: parseFloat(product.wholesalePrice.toString()),
    }))

  return (
    <>
      {isLoaded ? (
        <SkeletonHomePage />
      ) : (
        <main className="min-h-screen">
          <BannersCarousel />
          <div className="container mx-auto px-4 md:py-4">
            <ProductGrid products={serializedProducts} />
            <WhatsappButton />
          </div>
        </main>
      )}
    </>
  )
}
