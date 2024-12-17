import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SheetContent } from '@/components/ui/sheet'
import { Instagram, MapPin, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface SideMenuContentProps {
  setIsSideMenuOpen: (value: boolean) => void
}

export function SideMenuContent({ setIsSideMenuOpen }: SideMenuContentProps) {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden']

  return (
    <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col">
      <nav className="flex flex-col space-y-4 flex-grow">
        <Link
          href="/"
          className="text-sm font-medium transition-colors hover:text-primary"
          onClick={() => setIsSideMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/products"
          className="text-sm font-medium transition-colors hover:text-primary"
          onClick={() => setIsSideMenuOpen(false)}
        >
          Produtos
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium transition-colors hover:text-primary"
          onClick={() => setIsSideMenuOpen(false)}
        >
          Carrinho
        </Link>
        <Link
          href="/contact"
          className="text-sm font-medium transition-colors hover:text-primary"
          onClick={() => setIsSideMenuOpen(false)}
        >
          Contatos
        </Link>

        <Separator className="my-4" />

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {
            setIsSideMenuOpen(false)
          }}
        >
          Administração
        </Button>

        <Separator className="my-4" />

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Categorias</h3>
          {
            //passar categorias e fazer o map delas
          }
        </div>
      </nav>

      <Separator className="my-4" />

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Instagram className="h-5 w-5" />
          <a
            href="https://www.instagram.com/artlaser_crr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-primary"
          >
            @artlaser_crr
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <a
            href="https://wa.me/7788438467"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-primary"
          >
            WhatsApp
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span className="text-sm">R. do Mercado, Correntina - BA</span>
        </div>
      </div>
    </SheetContent>
  )
}
