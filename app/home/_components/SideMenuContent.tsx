'use client'
import { Separator } from '@/components/ui/separator'
import { SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Categories } from './Categories'
import { Contacts } from './Contacts'
import { Options } from './Options'

interface SideMenuContentProps {
  setIsSideMenuOpen: (value: boolean) => void
}

export function SideMenuContent({ setIsSideMenuOpen }: SideMenuContentProps) {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const listCategories = async () => {
      try {
        const response = await fetch('/api/products/categories')
        const categories: string[] = await response.json()
        setCategories(categories)
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
      }
    }

    listCategories()
  }, [])

  return (
    <SheetContent
      side="left"
      className="w-[300px] sm:w-[400px] flex flex-col overflow-y-auto"
    >
      <SheetTitle>
        <header className="flex flex-col items-center justify-center px-4 py-5">
          <Image
            src="/imagens/Logo.png"
            alt="Logo ArtLaser"
            width={150}
            height={50}
            priority
          />
        </header>
      </SheetTitle>

      <SheetDescription className="text-center text-black">
        Transformando ideias em brindes e artes personalizadas
      </SheetDescription>

      <Options setIsSideMenuOpen={setIsSideMenuOpen} />

      <Separator className="my-1" />

      <Categories categories={categories} setIsSideMenuOpen={setIsSideMenuOpen} />

      <Separator className="my-1" />

      <Contacts />
    </SheetContent>
  )
}
