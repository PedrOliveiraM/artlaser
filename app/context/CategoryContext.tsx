'use client'
import React, { createContext, useContext, useState } from 'react'

// Define o tipo para o contexto
type CategoryContextType = {
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
}

// Cria o contexto
const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

// Cria o Provider do contexto
export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}

// Hook para usar o contexto
export const useCategoryContext = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider')
  }
  return context
}
