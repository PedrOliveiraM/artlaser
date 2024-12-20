import { Button } from '@/components/ui/button'
import { Gift, ShoppingCart, UserCog } from 'lucide-react'
import Link from 'next/link'

interface OptionsProps {
  setIsSideMenuOpen: (status: boolean) => void
}
export function Options({ setIsSideMenuOpen }: OptionsProps) {
  return (
    <nav className="flex flex-col">
      <span className="font-semibold">Menu</span>
      <Button variant={'link'} asChild className="flex justify-start">
        <Link
          href="/home"
          className="text-sm font-medium transition-colors hover:text-primary "
          onClick={() => setIsSideMenuOpen(false)}
        >
          <Gift className="h-5 w-5" />
          Produtos
        </Link>
      </Button>

      <Button variant={'link'} asChild className="flex justify-start">
        <Link
          href="/home/cart"
          className="text-sm font-medium transition-colors hover:text-primary flex gap-2 items-center"
          onClick={() => setIsSideMenuOpen(false)}
        >
          <ShoppingCart className="h-5 w-5" />
          Carrinho
        </Link>
      </Button>
    </nav>
  )
}
