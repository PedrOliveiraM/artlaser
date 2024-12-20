'use client'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AddToCartNotification from './AddToCartNotification'
import { IProduct } from '@/types/IProduct'

interface ProductCardProps {
  product: IProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState<number>(0)
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false)

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(0, prev - 1))

  const onClose = () => setIsNotificationOpen(false)
  const onGoToCart = () => router.push('/home/cart')

  function handleAddToCart() {
    const adjustedQuantity = quantity || 1
    try {
      addToCart({
        id: product.id,
        retailPrice: product.retailPrice,
        wholesalePrice: product.wholesalePrice,
        name: product.name,
        description: product.description,
        category: product.category,
        imageUrl: product.imageUrl,
        status: product.status,
        CreatedAt: product.CreatedAt,
        minQuantity: product.minQuantity,
        quantity: adjustedQuantity,
      })

      setQuantity(adjustedQuantity)
      setIsNotificationOpen(true)
    } catch (error) {
      setIsNotificationOpen(false)
      console.error('Erro ao adicionar produto:', error)
      toast({
        title: 'Erro!',
        variant: 'destructive',
        description: 'Não foi possível adicionar o produto ao carrinho',
      })
    }
  }

  return (
    <>
      {isNotificationOpen && (
        <AddToCartNotification onClose={onClose} onGoToCart={onGoToCart} />
      )}

      <Card className="w-full flex flex-col h-full">
        <CardContent className="p-2 sm:p-4 flex-grow">
          <div className="aspect-square relative mb-2 sm:mb-4">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-sm sm:text-base text-center font-semibold text-brown-800 line-clamp-2 h-10 sm:h-12">
              {product.name}
            </h2>
            <p className="text-black text-xs sm:text-sm">
              Varejo: R$ {product.retailPrice.toFixed(2)}
            </p>
            <p className="text-brown-600 text-xs sm:text-sm">
              Atacado: R$ {product.wholesalePrice.toFixed(2)}
            </p>
            <p className="text-brown-600 text-xs sm:text-sm">
              Quant. Atacado: {product.minQuantity}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2 sm:mt-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
              onClick={decrementQuantity}
            >
              -
            </Button>
            <span className="text-sm sm:text-base font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
              onClick={incrementQuantity}
            >
              +
            </Button>
          </div>
        </CardContent>
        <CardFooter className="p-2 sm:p-4 pt-0 sm:pt-0">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm py-1 sm:py-2"
            onClick={handleAddToCart}
          >
            Comprar
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
