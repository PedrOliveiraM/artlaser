import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CircleUserRound, LogOutIcon, Settings } from 'lucide-react'

export default function User() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUserRound size={40} className="hover:scale-105" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <button type="button" className="flex gap-2">
            <Settings /> Configurações
          </button>
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
