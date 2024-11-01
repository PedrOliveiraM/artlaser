'use client'
import { Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import { columns } from './dashboard/_components/Product-columns'
import { DataTable } from './dashboard/_components/DataTable'
import Loading from '@/components/loading'
import { Toast } from '@/components/ui/toast'
import { toast } from '@/hooks/use-toast'

export default function Home() {
  const [data, setData] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      const result = await response.json()
      setData(result)
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <Loading />
  return (
    <div className="container mx-auto w-3/4 p-5 md:w-full">
      <DataTable columns={columns(fetchData)} data={data} />
    </div>
  )
}
