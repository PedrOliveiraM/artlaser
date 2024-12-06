'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
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

interface ProductItemProps {
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
  name,
  description,
  retailPrice,
  wholesalePrice,
  minQuantity,
  imageUrl,
}: ProductItemProps) {
  const [quantity, setQuantity] = useState(0)

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => (prev === 0 ? 0 : prev - 1))

  return (
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
            <span className="font-medium text-gray-900">R${retailPrice.toFixed(2)}</span>
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
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Comprar
        </Button>
      </CardFooter>
    </Card>
  )
}
