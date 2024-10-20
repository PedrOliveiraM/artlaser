import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TemplateCardFooterProps {
  offset: number
  totalItems: number
  itemsPerPage: number
  prevPage: () => void
  nextPage: () => void
  maxOffset: number
}

export default function TemplateCardFooter({
  offset,
  itemsPerPage,
  totalItems,
  prevPage,
  nextPage,
  maxOffset,
}: TemplateCardFooterProps) {
  return (
    <CardFooter>
      <form className="flex w-full items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Mostrando{' '}
          <strong>
            {Math.min(offset - 1, totalItems) + 1}-
            {Math.min(offset * itemsPerPage, totalItems)}
          </strong>{' '}
          de <strong>{totalItems}</strong> itens
        </div>
        <div className="flex">
          <Button
            onClick={prevPage} // Alterando para onClick em vez de formAction
            variant="ghost"
            size="sm"
            disabled={offset === 1} // Desabilitar se estiver na primeira página
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
          <Button
            onClick={nextPage} // Alterando para onClick em vez de formAction
            variant="ghost"
            size="sm"
            disabled={offset === maxOffset} // Desabilitar se estiver na última página
          >
            Próximo
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </CardFooter>
  )
}
