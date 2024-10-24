import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { Product } from '@prisma/client'
import { MoreHorizontal, Pencil, ToggleRight, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { updateProductStatus } from '../_actions/actions'
import Link from 'next/link'

export function ProductItem({ product }: { product: Product }) {
  const [stateProduct, setStateProduct] = useState(product)

  async function toggleProductStatus(id: number) {
    try {
      const updatedProduct = await updateProductStatus(id)
      setStateProduct(updatedProduct.data)
    } catch (error) {
      console.error('Error updating banner status:', error)
    }
  }
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt={stateProduct.name}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={stateProduct.imageUrl}
          width="64"
        />
      </TableCell>

      <TableCell className="text-center font-medium">
        {stateProduct.name}
      </TableCell>

      <TableCell className="text-center">
        <Badge
          variant={stateProduct.status ? 'success' : 'destructive'}
          className="capitalize"
        >
          {stateProduct.status ? 'Ativo' : 'Pausado'}
        </Badge>
      </TableCell>

      <TableCell className="hidden text-center md:table-cell">{`R$ ${stateProduct.retailPrice}`}</TableCell>

      <TableCell className="hidden text-center md:table-cell">
        {`R$ ${stateProduct.wholesalePrice}`}
      </TableCell>

      <TableCell className="hidden text-center md:table-cell">
        {stateProduct.category}
      </TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="border-b-2 border-solid">
              Ações
            </DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center gap-2">
              <button
                className="flex items-center gap-2"
                onClick={() => toggleProductStatus(stateProduct.id)}
              >
                <ToggleRight size={20} />
                {stateProduct.status ? 'Desativar' : 'Ativar'}
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Link
                href={`/dashboard/alt-product/${stateProduct.id}`}
                className="flex items-center gap-2"
              >
                <Pencil size={20} />
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form>
                <button type="submit" className="flex items-center gap-2">
                  <Trash2 size={20} />
                  Remover
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
