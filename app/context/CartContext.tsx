'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { SerializedProducts } from '../home/_components/ProductGrid'

export type CartItem = SerializedProducts & {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  updateItemQuantity: (id: number, newQuantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // Recuperar do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart')
      try {
        if (storedCart) setCart(JSON.parse(storedCart))
      } catch (error) {
        console.error('Erro ao recuperar o carrinho:', error)
      }
    }
  }, [])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((item: CartItem) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }]
    })
  }, [])

  const updateItemQuantity = useCallback((id: number, newQuantity: number) => {
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    )
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateItemQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um <CartProvider>')
  }
  return context
}
