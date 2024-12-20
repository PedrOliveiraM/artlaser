'use client'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, FilterX, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCategoryContext } from '@/app/context/CategoryContext'
import { IProduct } from '@/types/IProduct'

type CategoryOption = {
  value: string
  label: string
}

interface SearchMenuProps {
  data: IProduct[]
  handleChangeSearch: (search: string) => void
}

export function SearchMenu({ data, handleChangeSearch }: SearchMenuProps) {
  const { selectedCategory, setSelectedCategory } = useCategoryContext() // Contexto de categorias
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<CategoryOption[]>([])

  useEffect(() => {
    const listCategories = () => {
      try {
        const uniqueCategories = Array.from(
          new Set(data.map(product => product.category))
        )

        const formattedCategories = uniqueCategories.map(category => ({
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1),
        }))

        setCategories(formattedCategories)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    listCategories()
  }, [data])

  const resetFilter = () => {
    setSelectedCategory('') // Reseta a categoria no contexto
  }

  return (
    <div className="grid w-full gap-4 py-2 sm:grid-cols-6 md:grid-cols-6 xl:grid-cols-6 xl:px-24">
      <div className="col-span-1 sm:col-span-1 md:col-span-1 flex items-center">
        <h1 className="font-bold text-xl">Nossos Produtos</h1>
      </div>

      <div className="col-span-1 sm:col-span-3 md:col-span-3">
        <div className="flex justify-center items-center rounded-lg border-2 md:max-w-72 lg:max-w-full border-[#C8C8CC] px-5 bg-orange-50">
          <input
            id="inputSearchProduct"
            className="w-full h-10 rounded-l-lg border-0 outline-none px-2 bg-orange-50"
            type="text"
            placeholder="Procure pelo produto..."
            onChange={e => handleChangeSearch(e.target.value)}
          />
          <button
            type="button"
            id="btnSearchProduct"
            className="size-5 text-black flex items-center"
          >
            <Search className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="col-span-1 sm:col-span-2 md:col-span-2 ">
        <div className="flex justify-end gap-1">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="default"
                aria-expanded={open}
                className="justify-between w-full"
              >
                {selectedCategory
                  ? categories.find(category => category.value === selectedCategory)
                      ?.label
                  : 'Mostrar por...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Buscar categorias..." />
                <CommandList>
                  <CommandEmpty>Não achamos essa categoria</CommandEmpty>
                  <CommandGroup>
                    {categories.map(category => (
                      <CommandItem
                        key={category.value}
                        value={category.value}
                        onSelect={currentValue => {
                          setSelectedCategory(
                            currentValue === selectedCategory ? '' : currentValue
                          ) // Atualiza a categoria no contexto
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedCategory === category.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {category.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={resetFilter}
                >
                  <FilterX className="h-4 w-4" />
                  Limpar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Limpar Filtro</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
