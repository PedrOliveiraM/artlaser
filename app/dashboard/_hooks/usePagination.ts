import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Banner, Product } from '@prisma/client'

interface UsePaginationProps<T> {
  items: T[]
  totalItems: number
  itemsPerPageDefault?: number
  filter: string
}

export function usePagination<T>({
  items,
  totalItems,
  itemsPerPageDefault = 2,
  filter,
}: UsePaginationProps<T>) {
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault)
  const [maxOffset, setMaxOffset] = useState(1)
  const [offset, setOffset] = useState(1)

  const router = useRouter()
  const searchParams = useSearchParams()

  const minOffset = 1

  const pages = () => {
    return Math.ceil(totalItems / itemsPerPage) || minOffset
  }

  const handleSelectChange = (value: string) => {
    setItemsPerPage(Number(value))
    setOffset(1)
  }

  const validOffset = (offset: number): boolean => {
    return offset > 0 && offset <= maxOffset
  }

  const initialOffset = () => {
    const offsetParams = Number(searchParams?.get('offset'))
    return validOffset(offsetParams) ? offsetParams : minOffset
  }

  useEffect(() => {
    setMaxOffset(pages())
  }, [itemsPerPage, totalItems])

  useEffect(() => {
    setOffset(initialOffset())
  }, [])

  useEffect(() => {
    setOffset(1)
  }, [items])

  const nextPage = () => {
    const newOffset = offset + 1
    if (validOffset(newOffset)) {
      setOffset(newOffset)
      router.push(`/?offset=${newOffset}`, { scroll: false })
    }
  }

  const prevPage = () => {
    const newOffset = Math.max(1, offset - 1)
    if (validOffset(newOffset)) {
      setOffset(newOffset)
      router.push(`/?offset=${newOffset}`, { scroll: false })
    }
  }

  const paginatedItems = useMemo(() => {
    const filtered = items.filter((item) =>
      (item as Product | Banner).name
        .toLowerCase()
        .includes(filter?.toLowerCase() || ''),
    )
    return filtered.slice((offset - 1) * itemsPerPage, offset * itemsPerPage)
  }, [items, filter, offset, itemsPerPage])

  return {
    paginatedItems,
    itemsPerPage,
    handleSelectChange,
    offset,
    maxOffset,
    nextPage,
    prevPage,
  }
}
