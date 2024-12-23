'use client'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { Menu, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SideMenuContent } from './SideMenuContent'
import { useCart } from '@/app/context/CartContext'

export function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const { cart } = useCart()
  const productsQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-orange-400 backdrop-blur supports-[backdrop-filter]:bg-orange-400">
      <div className="flex justify-between items-center px-5 py-2">
        <div className="flex gap-3">
          <Sheet open={isSideMenuOpen} onOpenChange={setIsSideMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-2 text-base hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                asChild
              >
                <Menu className="h-10 w-10" strokeWidth={3} />
              </Button>
            </SheetTrigger>
            <SideMenuContent setIsSideMenuOpen={setIsSideMenuOpen} />
          </Sheet>

          <Link href="/home" className="mr-6 flex items-center space-x-2">
            <Image
              src="/imagens/Logo.png"
              alt="Logo ArtLaser"
              width={150}
              height={50}
              priority
            />
          </Link>
        </div>

        <Link href="/home/cart" className="relative transition-colors hover:text-primary">
          <div className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {productsQuantity}
          </div>
          <ShoppingCart className="h-6 w-6" strokeWidth={3} />
        </Link>
      </div>
    </header>
  )
}
