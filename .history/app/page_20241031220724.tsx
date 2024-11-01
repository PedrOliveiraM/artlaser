'use client'
import { Product } from '@prisma/client'
import { useEffect, useState } from 'react'
import { columns } from './dashboard/_components/Product-columns'
import { DataTable } from './dashboard/_components/Product-data-table'

export default function Home() {
  const [data, setData] = useState<Product[]>([])

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
    <div className="md:full container mx-auto w-3/4">
      <DataTable columns={columns(fetchData)} data={data} />{' '}
      {/* Passa fetchData  prop */}
    </div>
  )
}
