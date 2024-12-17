'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '../../context/CartContext'
import { ICartItem } from '@/types/ICardItem'
import CartItem from '../_components/CardItem'
import { Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LiaBroomSolid } from 'react-icons/lia'
import { CartFooter } from '../_components/CartFooter'
import { CartItemGrid } from '../_components/CartItemGrid'
import { ClearCartConfirmation } from '../_components/ClearCartConfirmation'

export default function ShoppingCart() {
  const router = useRouter()
  const { cart, updateItemQuantity, removeFromCart, clearCart } = useCart()
  const [cartItems, setCartItems] = useState<ICartItem[]>([])

  useEffect(() => {
    setCartItems(cart)
  }, [cart])

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price =
        item.quantity >= item.minQuantity ? item.wholesalePrice : item.retailPrice
      return total + price * item.quantity
    }, 0)
  }

  const calculateSaved = () => {
    return cartItems.reduce((total, item) => {
      if (item.quantity >= item.minQuantity) {
        const savedPerItem = item.retailPrice - item.wholesalePrice
        return total + savedPerItem * item.quantity
      }
      return total
    }, 0)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateItemQuantity(id, newQuantity)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="link" size="sm" onClick={() => router.push('/home')}>
        <Undo2 strokeWidth={3} size={10} />
        Voltar
      </Button>

      <h1 className="text-3xl font-bold text-brown-800 mb-8">Carrinho de Compras</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <>
          <CartItemGrid
            cartItems={cartItems}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
          />

          <ClearCartConfirmation clearCart={clearCart} />
          

          <CartFooter calculateSaved={calculateSaved} calculateTotal={calculateTotal} />
        </>
      )}
    </div>
  )
}
