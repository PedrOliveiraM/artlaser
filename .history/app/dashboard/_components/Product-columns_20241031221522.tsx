'use client'
import { Decimal } from '@prisma/client/runtime/library'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import DropdownMenuTable from './DropdownMenu-table'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

export const columns: ColumnDef<ProductData>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome do Produto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="max-w- flex-nowrap" title={row.original.name}>
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: 'retailPrice',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Preço de Varejo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Preço de Atacado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge
          className="flex w-full max-w-20 items-center justify-center"
          variant={row.getValue('status') ? 'success' : 'destructive'}
        >
          {row.getValue('status') ? 'Ativo' : 'Inativo'}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Categoria
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    header: 'Ações',
    id: 'actions',
    cell: ({ row }) => {
      const productId = row.original.id // Acesse o id diretamente da linha
      const productStatus: boolean = row.getValue('status')

      return (
        <DropdownMenuTable
          id={productId.toString()} // Passe o id para o Dropdown
          status={productStatus}
          fetchData={} // Implemente a função fetchData
        />
      )
    },
  },
]
