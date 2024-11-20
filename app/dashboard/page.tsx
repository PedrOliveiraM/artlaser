'use client'
import { Banner, Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import Loading from '@/components/loading'
import { useToast } from '@/hooks/use-toast'
import { DataTable } from './_components/DataTable'
import { Productcolumns } from './_components/Product-columns'
import { BannerColumns } from './_components/Banner-Columns'
import DashboardLayout from './dashboardLayout'
import FieldSet from './_components/FieldSet'
import { ApiResponse } from '@/utils/ApiResponse'

export default function Home() {
  const [dataProducts, setDataProducts] = useState<Product[]>([])
  const [dataBanners, setDataBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchDataProducts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      const result = await response.json()
      setDataProducts(result)
      setLoading(false)
      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'Produtos carregados com sucesso.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao carregar os produtos.',
      })
    }
  }, [toast])

  const fetchDataBanners = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/banners')
      const result: ApiResponse<Banner[]> = await response.json()
      if (!result.data) throw new Error('Falha ao carregar os banners')
      setDataBanners(result.data)
      setLoading(false)
      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'Banners carregados com sucesso.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao carregar os banners.',
      })
    }
  }, [toast])

  useEffect(() => {
    fetchDataProducts()
    fetchDataBanners()
  }, [fetchDataProducts, fetchDataBanners])

  if (loading) return <Loading />
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <FieldSet title="Produtos" description="Painel de produtos">
          <DataTable
            columns={Productcolumns(fetchDataProducts)}
            data={dataProducts}
            title="Produtos"
          />
        </FieldSet>

        <FieldSet title="Banners" description="Painel de banners">
          <DataTable
            columns={BannerColumns(fetchDataBanners)}
            data={dataBanners}
            title="Banners"
          />
        </FieldSet>
      </div>
    </DashboardLayout>
  )
}
