'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import DropdownMenuTable from './DropdownMenu-table'

export type BannerData = {
  id: number
  name: string
  imageUrl: string
  status: boolean
}

export const BannerColumns = (fetchData: () => void): ColumnDef<BannerData>[] => [
  {
    accessorKey: 'imageUrl',
    header: 'Imagem',
    cell: ({ row }) => {
      const imageUrl = row.getValue('imageUrl') as string
      if (!imageUrl) return ' '
      console.log(imageUrl)
      return (
        <div className="flex items-center justify-center">
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
        Nome do Banner
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
    header: 'Ações',
    id: 'actions',
    cell: ({ row }) => {
      const bannerId = row.original.id
      const bannerStatus: boolean = row.getValue('status')

      return (
        <DropdownMenuTable
          id={bannerId.toString()}
          status={bannerStatus}
          type="banner"
          fetchData={fetchData}
        />
      )
    },
  },
]
