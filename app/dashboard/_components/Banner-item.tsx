'use client'
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
import { Banner } from '@prisma/client'
import { MoreHorizontal, Pencil, ToggleRight, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { updateBannerStatus } from '../_actions/actions'

export function BannerItem({ banner }: { banner: Banner }) {
  async function handleStatusToggleButton(bannerId: number) {
    try {
      const res = await updateBannerStatus(bannerId)
      if (res.success) {
        setStateBanner(res.data)
      }
    } catch (error) {
      throw new Error(`Unable to update banner : ${error}`)
    }
  }

  const [stateBanner, setStateBanner] = useState(banner)

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt={stateBanner.name}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={`/api/uploads/${stateBanner.imagePath}`}
          width="64"
        />
      </TableCell>

      <TableCell className="text-center font-medium">
        {stateBanner.name}
      </TableCell>

      <TableCell className="text-center">
        <Badge
          variant={stateBanner.status ? 'success' : 'destructive'}
          className="capitalize"
        >
          {stateBanner.status ? 'Ativo' : 'Pausado'}
        </Badge>
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
                onClick={() => handleStatusToggleButton(stateBanner.id)}
              >
                <ToggleRight size={20} />
                {stateBanner.status ? 'Desativar' : 'Ativar'}
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Pencil size={20} />
              Editar
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
