'use client'
import { Banner, Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import Loading from '@/components/loading'
import { useToast } from '@/hooks/use-toast'
import { DataTable } from './_components/DataTable'
import { Productcolumns } from './_components/Product-columns'
import { BannerColumns } from './_components/Banner-Columns'

export default function Home() {
  const [dataProducts, setDataProducts] = useState<Product[]>([])
  const [dataBanners, setDataBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchDataProducts = async () => {
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
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      })
    }
  }
  const fetchDataBanners = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/banners')
      const result = await response.json()
      setDataBanners(result)
      setLoading(false)
      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'Banners carregados com sucesso.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      })
    }
  }

  useEffect(() => {
    fetchDataProducts()
    fetchDataBanners()
  }, [])

  if (loading) return <Loading />
  return (
    <div className="container mx-auto w-3/4 p-5 md:w-full">
      <DataTable
        columns={Productcolumns(fetchDataProducts)}
        data={dataProducts}
        title="Produtos"
      />

      <DataTable
        columns={BannerColumns(fetchDataBanners)}
        data={dataBanners}
        title="Banners"
      />
    </div>
  )
}
