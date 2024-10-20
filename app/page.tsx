'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col">
          <h1 className="text-center text-3xl font-bold">HOME PAGE</h1>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/add-product">Adicionar Produto</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
