'use client'
import { Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import { columns } from './dashboard/_components/Product-columns'
import { DataTable } from './dashboard/_components/DataTable'

export default function Home() {
  const [data, setData] = useState<Product[]>([])
  const 
  const fetchData = async () => {
    try {
      const response = await fetch('/api/products')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container mx-auto w-3/4 p-5 md:w-full">
      <DataTable columns={columns(fetchData)} data={data} />
    </div>
  )
}
