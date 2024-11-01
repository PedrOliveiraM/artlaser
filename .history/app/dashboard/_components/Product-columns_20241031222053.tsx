'use client'
import { Decimal } from '@prisma/client/runtime/library'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import DropdownMenuTable from './DropdownMenu-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export type ProductData = {
  id: number
  imageUrl: string
  name: string
  retailPrice: Decimal
  wholesalePrice: Decimal
  minQuantity: number
  status: boolean
  category: string
}

export const columns = (fetchData: () => void): ColumnDef<ProductData>[] => [
  {
    accessorKey: 'imageUrl',
    header: 'Imagem',
    cell: ({ row }) => {
      const imageUrl = row.getValue('imageUrl') as string
      if (!imageUrl) return ' '
      console.log(imageUrl)
      return (
        <div className="flex items-center">
          <Image
            src={imageUrl}
            alt="Product Image"
            width={64}
            height={64}
            className="rounded-sm object-cover"
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Nome do Produto
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'retailPrice',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Preço de Varejo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('retailPrice'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'wholesalePrice', // Corrigido para "wholesalePrice"
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Preço de Atacado
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('wholesalePrice'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'minQuantity',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Quantidade Mínima
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('minQuantity')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant={row.getValue('status') ? 'success' : 'destructive'}>
      <div className="capitalize">
        {row.getValue('status') ? 'Ativo' : 'Inativo'}
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Categoria
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    header: 'Ações',
    id: 'actions',
    cell: ({ row }) => {
      const productId = row.original.id
      const productStatus: boolean = row.getValue('status')

      return (
        <DropdownMenuTable
          id={productId.toString()}
          status={productStatus}
          fetchData={fetchData}
        />
      )
    },
  },
]
