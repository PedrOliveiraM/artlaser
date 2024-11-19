import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface IProductUpdateDto {
  id: number | undefined
  name: string
  description: string
  category: string
  retailPrice: number
  wholesalePrice: number
  minQuantity: number
  status: 'ativo' | 'inativo'
  imageUrl?: string
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    const product = await db.product.findUnique({
      where: { id: Number.parseInt(id) },
    })

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body: IProductUpdateDto = await request.json()

    const updatedProduct = await db.product.update({
      where: { id: Number.parseInt(id) },
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        retailPrice: body.retailPrice,
        wholesalePrice: body.wholesalePrice,
        minQuantity: body.minQuantity,
        status: body.status === 'ativo',
        imageUrl: body.imageUrl,
      },
    })

    if (!updatedProduct) throw new Error('Erro ao atualizar o produto!')

    return NextResponse.json({ updatedProduct }, { status: 200 })
  } catch (error) {
    console.error('Erro ao processar a requisição:', error)
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 })
  }
}
