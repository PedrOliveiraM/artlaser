// page.tsx
'use client'

import { Banner, Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import { ProductsTable } from './_components/Products-table'
import { BannersTable } from './_components/Banners-table'
import DashboardLayout from './dashboardLayout'
import { useToast } from '@/hooks/use-toast' // Importando o useToast

export default function DashBoard() {
  const [products, setProducts] = useState<Product[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [filter, setFilter] = useState('')
  const { toast } = useToast() // Inicializando o toast

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        if (!res.ok) {
          throw new Error('Falha ao buscar produtos')
        }
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro',
          description: 'Não foi possível listar os produtos.',
          variant: 'destructive',
        })
      }
    }
    fetchProducts()
  }, [toast]) // Adicionando toast como dependência

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners')
        if (!res.ok) {
          throw new Error('Falha ao buscar banners')
        }
        const data = await res.json()
        setBanners(data)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro',
          description: 'Não foi possível listar os banners.',
          variant: 'destructive',
        })
      }
    }
    fetchBanners()
  }, [toast]) // Adicionando toast como dependência

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
