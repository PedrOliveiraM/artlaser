'use client'
import { useCategoryContext } from '@/app/context/CategoryContext'
import { Button } from '@/components/ui/button'

interface CategoryProps {
  setIsSideMenuOpen: (value: boolean) => void
  name: string
}

export function Category({ name, setIsSideMenuOpen }: CategoryProps) {
  const { setSelectedCategory } = useCategoryContext()

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setIsSideMenuOpen(false)
  }

  return (
    <Button
      variant={'link'}
      className="flex justify-start"
      onClick={() => handleCategoryChange(name)}
    >
      {name}
    </Button>
  )
}
