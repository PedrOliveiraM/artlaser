import { Button } from '@/components/ui/button'
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
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <CircleUserRound className="h-8 w-8" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <button className="flex gap-2">
            <Settings /> Configurações
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button className="flex gap-2">
            <LogOutIcon /> Sair
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
