'use client'
import { Decimal } from '@prisma/client/runtime/library'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import DropdownMenuTable from './DropdownMenu-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'

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
    header: 'Nome do Produto',
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

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)

      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'wholeSalePrice',
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

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)

      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'minQuantity',
    header: 'Quantidade Mínima',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue('status') ? 'Ativo' : 'INATIVO'}
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
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
          fetchData={fetchData}
        />
      )
    },
  },
]
