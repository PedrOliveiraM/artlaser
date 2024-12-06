import { db } from '@/lib/prisma'
import React from 'react'
import { ProductItem } from './ProductItem'

export async function ProductList() {
  const products = await db.product.findMany()

  // Transforme Decimal em números
  const serializedProducts = products.map(product => ({
    ...product,
    retailPrice: product.retailPrice.toNumber(),
    wholesalePrice: product.wholesalePrice.toNumber(),
  }))

  return (
    <div className="grid grid-cols-2 mx-auto max-w-7xl mb-16 gap-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {serializedProducts.map(product => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  )
}
