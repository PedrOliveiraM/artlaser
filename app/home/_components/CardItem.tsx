'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { ICartItem } from '@/types/ICardItem'

interface CartItemProps {
  item: ICartItem
  onUpdateQuantity: (id: number, newQuantity: number) => void
  onRemove: (id: number) => void
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)

  const incrementQuantity = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    onUpdateQuantity(item.id, newQuantity)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  const price = quantity >= item.minQuantity ? item.wholesalePrice : item.retailPrice
  const totalPrice = price * quantity

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={80}
        height={80}
        className="rounded-md"
      />

      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-brown-800">{item.name}</h3>
        <p className="text-sm text-gray-600">
          Preço: R${price.toFixed(2)}{' '}
          {quantity >= item.minQuantity ? '(Atacado)' : '(Varejo)'}
        </p>
      </div>

      <div className="flex flex-col">
        {/* Botoes*/}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={decrementQuantity}
          >
            -
          </Button>
          <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={incrementQuantity}
          >
            +
          </Button>
        </div>

        {/* Valor e Excluir*/}
        <div className="flex gap-2 items-center">
          <p className="text-lg font-semibold text-brown-800">${totalPrice.toFixed(2)}</p>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}
