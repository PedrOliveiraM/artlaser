import { db } from '@/lib/prisma'
import { ProductList } from './_components/ProductList'

export default async function Home() {
  const products = await db.product.findMany({})

  const serializedProducts = products.map(product => ({
    ...product,
    retailPrice: product.retailPrice.toNumber(),
    wholesalePrice: product.wholesalePrice.toNumber(),
  }))

  return <ProductList products={serializedProducts} />
}
