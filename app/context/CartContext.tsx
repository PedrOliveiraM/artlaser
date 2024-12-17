'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { ProductItemProps } from '../home/_components/ProductItem'

// Definir o formato do carrinho
export type CartItem = ProductItemProps & {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // Carregar o carrinho do localStorage ao carregar a aplicação
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  // Salvar o carrinho no localStorage sempre que ele for atualizado
  useEffect(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify(
        cart.map(item => ({
          ...item,
          retailPrice: item.retailPrice.toString(),
          wholesalePrice: item.wholesalePrice.toString(),
        }))
      )
    )
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, minQuantity: cartItem.minQuantity + item.minQuantity }
            : cartItem
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook personalizado para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
