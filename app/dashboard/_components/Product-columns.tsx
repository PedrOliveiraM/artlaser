'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Decimal } from '@prisma/client/runtime/library'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import DropdownMenuTable from './DropdownMenu-table'

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

export const Productcolumns = (fetchData: () => void): ColumnDef<ProductData>[] => [
  {
    accessorKey: 'imageUrl',
    header: 'Imagem',
    cell: ({ row }) => {
      const imageUrl = row.getValue('imageUrl') as string
      if (!imageUrl) return ' '
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
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="max-w-36">{row.getValue('name')}</span>
      </div>
    ),
  },

  {
    accessorKey: 'retailPrice',
    sortingFn: 'alphanumeric',
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
    accessorKey: 'wholesalePrice',
    sortingFn: 'alphanumeric',
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
    sortingFn: 'alphanumeric',

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Quantidade Mínima
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue('minQuantity')}</div>,
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
        <div className="min-w-10 text-center capitalize">
          {row.getValue('status') ? 'Ativo' : 'Inativo'}
        </div>
      </Badge>
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
          type="product"
          fetchData={fetchData}
        />
      )
    },
  },
]
