'use client'
import { Product } from '@prisma/client'
import { columns } from './dashboard/_components/Product-columns'
import { DataTable } from './dashboard/_components/Product-data-table'
import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
