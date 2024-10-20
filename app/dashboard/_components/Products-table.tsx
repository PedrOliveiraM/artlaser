'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client'
import TemplateCardFooter from './CardFooter'
import { ProductItem } from './Product-item'
import SelectItems from './Select-items'

import Link from 'next/link'
import { usePagination } from '../_hooks/usePagination'

export function ProductsTable({
  products,
  totalProducts,
  filter,
}: {
  products: Product[] | []
  totalProducts: number
  filter: string
}) {
  const {
    handleSelectChange,
    nextPage,
    prevPage,
    maxOffset,
    offset,
    paginatedItems,
    itemsPerPage,
  } = usePagination({
    filter,
    items: products,
    totalItems: totalProducts,
    itemsPerPageDefault: 2,
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <CardTitle>Produtos</CardTitle>
            <CardDescription>Gerencie aqui seus produtos</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href={'/dashboard/add-product'}>Cadastrar</Link>
            </Button>
            <SelectItems handleSelectChange={handleSelectChange} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] text-center sm:table-cell">
                Image
              </TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Preço de varejo
              </TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Preço de atacado
              </TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Categoria
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <TemplateCardFooter
        offset={offset}
        prevPage={prevPage}
        nextPage={nextPage}
        totalItems={totalProducts}
        itemsPerPage={itemsPerPage}
        maxOffset={maxOffset}
      />
    </Card>
  )
}
