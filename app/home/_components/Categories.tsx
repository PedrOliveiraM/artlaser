import { Category } from './Category'

export function Categories({ categories }: { categories: string[] }) {
  return (
    <div>
      <h1 className="font-semibold">Categorias</h1>
      <div className="flex flex-col gap-1">
        {categories.map((category, index) => (
          <Category key={index} name={category} />
        ))}
      </div>
    </div>
  )
}
