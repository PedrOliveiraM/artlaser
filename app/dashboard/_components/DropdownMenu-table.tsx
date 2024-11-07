'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, ToggleRight, Pencil, Trash2 } from 'lucide-react'
import {
  deleteBanner,
  deleteProduct,
  updateBannerStatus,
  updateProductStatus,
} from '../_actions/actions'
import Link from 'next/link'

interface IParams {
  id: string
  status: boolean
  type: string
  fetchData: () => void
}

export default function DropdownMenuTable({
  id,
  status,
  type,
  fetchData,
}: IParams) {
  async function toggleProductStatus(id: string) {
    try {
      await updateProductStatus(id)
      fetchData()
    } catch (error) {
      console.error('Error updating product status:', error)
    }
  }

  async function toggleBannerStatus(id: string) {
    try {
      await updateBannerStatus(id)
      fetchData()
    } catch (error) {
      console.error('Error updating banner status:', error)
    }
  }

  async function removeProduct(id: string) {
    try {
      await deleteProduct(id)
      fetchData()
    } catch (error) {
      console.error('Error updating banner status:', error)
    }
  }

  async function removeBanner(id: string) {
    try {
      await deleteBanner(id)
      fetchData()
    } catch (error) {
      console.error('Error updating banner status:', error)
    }
  }

  return (
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
            onClick={() =>
              type === 'product'
                ? toggleProductStatus(id)
                : toggleBannerStatus(id)
            }
          >
            <ToggleRight size={20} />
            {status ? 'Desativar' : 'Ativar'}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Link
            href={`/dashboard/alt-${type}/${id}`}
            className="flex items-center gap-2"
          >
            <Pencil size={20} />
            Editar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form>
            <button type="submit" className="flex items-center gap-2">
              <Trash2
                size={20}
                onClick={() =>
                  type === 'product' ? removeProduct(id) : removeBanner(id)
                }
              />
              Remover
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
