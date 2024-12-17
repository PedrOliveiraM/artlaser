'use client'
import { CartItem, useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AddToCartNotification from './AddToCartNotification'
export interface ProductItemProps {
  id: number
  name: string
  description: string
  category: string
  retailPrice: number
  wholesalePrice: number
  minQuantity: number
  imageUrl: string
  status: boolean
}

export function ProductItem({
  id,
  name,
  description,
  retailPrice,
  wholesalePrice,
  minQuantity,
  category,
  imageUrl,
  status,
}: ProductItemProps) {
  const { addToCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const [quantity, setQuantity] = useState(0)
  const [showNotification, setShowNotification] = useState(false)

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => (prev === 0 ? 0 : prev - 1))

  const handleAddToCart = () => {
    try {
      if (quantity === 0) throw new Error()

      const item: CartItem = {
        id,
        name,
        description,
        category,
        retailPrice,
        wholesalePrice,
        minQuantity,
        imageUrl,
        status,
        quantity,
      }
      addToCart(item)

      setShowNotification(true)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Opaa!',
        description: 'Informe a quantidade desejada para adicionar ao carrinho',
      })
    }
  }

  const handleCloseNotification = () => {
    setShowNotification(false)
  }

  const handleGoToCart = () => {
    router.push('/home/cart')
    setShowNotification(false)
  }

  return (
    <>
      {showNotification && (
        <AddToCartNotification
          onClose={handleCloseNotification}
          onGoToCart={handleGoToCart}
        />
      )}

      <Card className="w-full flex flex-col border rounded-lg shadow-sm overflow-hidden">
        <CardHeader className="h-72 bg-gray-50 flex flex-col items-center p-4">
          <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-md">
            <Image
              src={imageUrl}
              alt={name}
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
          <CardTitle className="mt-4 text-center text-lg font-semibold text-gray-800 line-clamp-2 break-words">
            {name}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 flex-grow flex flex-col">
          <p className="text-sm text-muted-foreground mb-4 h-20 line-clamp-3">
            {description}
          </p>
          <Separator className="my-2" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Varejo:</span>
              <span className="font-medium text-gray-900">
                R${retailPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Atacado:</span>
              <span className="font-medium text-gray-900">
                R${wholesalePrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">A partir de:</span>
              <span className="font-medium text-gray-900">{minQuantity}</span>
            </div>
          </div>

          <Separator className="my-4" />
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity < 0}
                className="sm:w-16 md:w-16"
              >
                -
              </Button>
              <Input
                id="quantity"
                type="number"
                min={minQuantity}
                onChange={e => setQuantity(Number(e.target.value))}
                value={quantity}
                className="w-14 text-center border border-gray-300 rounded-md sm:w-16 md:w-20 appearance-none"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                className="sm:w-16 md:w-16"
              >
                +
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4">
          <Button className="w-full" onClick={handleAddToCart}>
            Comprar
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
