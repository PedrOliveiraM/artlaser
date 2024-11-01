// page.tsx
'use client'

import { Banner, Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import { ProductsTable } from './_components/Products-table'
import { BannersTable } from './_components/Banners-table'
import DashboardLayout from './dashboardLayout'

export default function DashBoard() {
  const [products, setProducts] = useState<Product[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [filter, setFilter] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      } else {
        console.error('Failed to fetch products')
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await fetch('/api/banners')
      if (res.ok) {
        const data = await res.json()
        setBanners(data)
      } else {
        console.error('Failed to fetch banners')
      }
    }
    fetchBanners()
  }, [])

  return (
    <DashboardLayout onFilterChange={setFilter}>
      <div className="space-y-2">
        <ProductsTable
          products={products}
          totalProducts={products.length}
          filter={filter}
        />
        <BannersTable
          banners={banners}
          totalBanners={banners.length}
          filter={filter}
        />
      </div>
    </DashboardLayout>
  )
}
