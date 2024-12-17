import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SheetContent } from '@/components/ui/sheet'
import { Cat, Home, MapPin, MessageCircle, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CiInstagram } from 'react-icons/ci'
import { Categories } from './Categories'
import { Contacts } from './Contacts'
import { Options } from './Options'

interface SideMenuContentProps {
  setIsSideMenuOpen: (value: boolean) => void
}

export function SideMenuContent({ setIsSideMenuOpen }: SideMenuContentProps) {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden']

  return (
    <SheetContent
      side="left"
      className="w-[300px] sm:w-[400px] flex flex-col overflow-y-auto"
    >
      <header className="flex flex-col items-center justify-center px-4 py-5">
        <Image src="/imagens/Logo.png" alt="Logo ArtLaser" width={150} height={50} />
        <p className="text-sm text-center">
          Transformando ideias em brindes e artes personalizadas
        </p>
      </header>

      <Options setIsSideMenuOpen={setIsSideMenuOpen} />

      <Separator className="my-1" />

      <Categories categories={categories} />

      <Separator className="my-1" />

      <Contacts />
    </SheetContent>
  )
}
