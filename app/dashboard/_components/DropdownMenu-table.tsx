'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'
import { MoreHorizontal, Pencil, ToggleRight, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { deleteBanner, updateBannerStatus } from '../_actions/banner/actions'
import { deleteProduct, updateProductStatus } from '../_actions/product/actions'
import { useState } from 'react'
import Loading from '@/components/loading'

interface IParams {
  id: string
  status: boolean
  type: string
  fetchData: () => void
}

export default function DropdownMenuTable({ id, status, type, fetchData }: IParams) {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  async function toggleProductStatus(id: string) {
    try {
      setLoading(true)
      await updateProductStatus(id)
      setLoading(false)
      toast({
        description: 'Produto alterado com sucesso!',
        variant: 'success',
      })
      fetchData()
    } catch (error) {
      setLoading(false)
      console.error('Error updating product status:', error)
      toast({
        description: 'Erro ao alterar Produto!',
        variant: 'destructive',
      })
    }
  }

  async function toggleBannerStatus(id: string) {
    try {
      setLoading(true)
      await updateBannerStatus(id)
      setLoading(false)

      toast({
        description: 'Banner alterado com sucesso!',
        variant: 'success',
      })

      fetchData()
    } catch (error) {
      console.error('Error updating banner status:', error)
      setLoading(false)
      toast({
        description: 'Erro ao alterar Banner!',
        variant: 'destructive',
      })
    }
  }

  async function removeProduct(id: string) {
    try {
      setLoading(true)
      await deleteProduct(id)
      setLoading(false)

      toast({
        description: 'Produto removido com sucesso!',
        variant: 'success',
      })

      fetchData()
    } catch (error) {
      console.error('Error updating banner status:', error)
      setLoading(false)
      toast({
        description: 'O produto não foi removido!',
        variant: 'success',
      })
    }
  }

  async function removeBanner(id: string) {
    try {
      setLoading(true)
      await deleteBanner(id)
      setLoading(false)

      toast({
        description: 'Banner removido com sucesso!',
        variant: 'success',
      })

      fetchData()
    } catch (error) {
      console.error('Error updating banner status:', error)
      setLoading(false)
      toast({
        description: 'O Banner não foi removido!',
        variant: 'success',
      })
    }
  }

  if (loading) return <Loading />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="border-b-2 border-solid">Ações</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() =>
              type === 'product' ? toggleProductStatus(id) : toggleBannerStatus(id)
            }
          >
            <ToggleRight size={20} />
            {status ? 'Desativar' : 'Ativar'}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Link href={`/dashboard/alt-${type}/${id}`} className="flex items-center gap-2">
            <Pencil size={20} />
            Editar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => (type === 'product' ? removeProduct(id) : removeBanner(id))}
          >
            <Trash2 size={20} />
            Remover
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
