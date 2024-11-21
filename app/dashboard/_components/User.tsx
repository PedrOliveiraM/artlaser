import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CircleUserRound, LogOutIcon, Settings } from 'lucide-react'
import Link from 'next/link'

export default function User() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUserRound size={40} className="hover:scale-105" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={'dashboard/settings'}>
            <button type="button" className="flex gap-2">
              <Settings /> Configurações
            </button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button type="button" className="flex gap-2">
            <LogOutIcon /> Sair
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
