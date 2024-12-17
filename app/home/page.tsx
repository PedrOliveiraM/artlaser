// import { db } from '@/lib/prisma'
// import { ProductList } from './_components/ProductList'

// export default async function Home() {
//   const products = await db.product.findMany({})

//   const serializedProducts = products.map(product => ({
//     ...product,
//     retailPrice: product.retailPrice.toNumber(),
//     wholesalePrice: product.wholesalePrice.toNumber(),
//   }))

//   return <ProductList products={serializedProducts} />
// }

import { db } from '@/lib/prisma'
import { BannersCarousel } from '../home/_components/BannersCarousel'
import ProductGrid from './_components/ProductGrid'

export default async function Home() {
  const products = await db.product.findMany({})

  const serializedProducts = products.map(product => ({
    ...product,
    retailPrice: product.retailPrice.toNumber(),
    wholesalePrice: product.wholesalePrice.toNumber(),
  }))

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <ProductGrid products={serializedProducts} />
      </div>
    </main>
  )
}
