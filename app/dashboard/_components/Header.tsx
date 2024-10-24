import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import User from './User'
interface HeaderProps {
  onFilterChange: (filter: string) => void // Função recebida como prop
}

export function Header({ onFilterChange }: HeaderProps) {
  return (
    <header className="flex flex-col items-center justify-center gap-2 p-2 md:flex-row md:justify-between">
      <h1 className="pt-3 text-4xl font-bold">Artlaser Dashboard</h1>
      <form className="relative flex flex-1 gap-2 md:ml-auto md:grow-0">
        <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
        <Input
          name="search"
          type="search"
          placeholder="Procurar..."
          className="w-full rounded-lg bg-background pl-8 pt-2 md:w-[200px] lg:w-[336px]"
          onChange={(e) => onFilterChange(e.target.value)} // Atualiza o filtro
        />
        <User />
      </form>
    </header>
  )
}
