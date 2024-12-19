'use client'
import { Category } from './Category'

export function Categories({
  categories,
  setIsSideMenuOpen,
}: {
  categories: string[]
  setIsSideMenuOpen: (value: boolean) => void
}) {
  return (
    <div>
      <h1 className="font-semibold">Categorias</h1>
      <div className="flex flex-col gap-1">
        {categories.map((category, index) => (
          <Category
            key={index}
            name={category}
            setIsSideMenuOpen={setIsSideMenuOpen} // Passando a função para o componente Category
          />
        ))}
      </div>
    </div>
  )
}
