'use client'

import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'
import FormProduct from '../../_components/ProductForm'

interface IParams {
  id: string
}

interface IProductData {
  name: string
  description: string
  category: string
  retailPrice: number
  wholesalePrice: number
  minQuantity: number
  imageUrl: string
  status: boolean
}

export default function AltProduct({ params: { id } }: { params: IParams }) {
  const [product, setProduct] = useState<IProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`)
        if (!response.ok) {
          throw new Error('Falha ao buscar o produto')
        }
        const data = await response.json()
        setProduct(data)
        toast({
          title: 'Sucesso',
          description: 'Dados carregados com sucesso!',
          variant: 'success',
        })
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados! Tente Novamente.',
          variant: 'destructive',
        })
      } finally {
        setLoading(false) // Isso garante que setLoading(false) só seja chamado uma vez, no final
      }
    }

    fetchProduct()
  }, [id, toast]) // A dependência `toast` é correta aqui

  if (loading) return <p>Carregando...</p> // Mensagem de carregamento

  if (!product) return <p>Produto não encontrado</p> // Verificação se o produto foi encontrado

  return <FormProduct data={product} />
}
