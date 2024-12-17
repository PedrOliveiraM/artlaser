'use client'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { Menu, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SideMenuContent } from './SideMenuContent'

export function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/imagens/Logo.png" alt="Logo ArtLaser" width={150} height={50} />
          </Link>
        </div>

        <Link href="/home/cart" className="relative transition-colors hover:text-primary">
          <ShoppingCart className="h-6 w-6" strokeWidth={3} />
        </Link>
      </div>
    </header>
  )
}
